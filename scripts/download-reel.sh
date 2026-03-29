#!/usr/bin/env bash
# download-reel.sh — Download an Instagram reel and prep it for the site
#
# Usage:
#   ./scripts/download-reel.sh <instagram-url> <slug>
#
# Example:
#   ./scripts/download-reel.sh https://www.instagram.com/reel/ABC123/ ma-nouvelle-oeuvre
#
# Output:
#   public/videos/works/<slug>.mp4
#   public/videos/works/<slug>.webm
#   src/assets/images/works/<slug>.jpg   ← thumbnail (frame 1s)

set -euo pipefail

# ── Args ──────────────────────────────────────────────────────────────────────
URL="${1:-}"
SLUG="${2:-}"

if [[ -z "$URL" || -z "$SLUG" ]]; then
  echo "Usage: $0 <instagram-url> <slug>"
  echo "  e.g. $0 https://www.instagram.com/reel/ABC123/ ma-nouvelle-oeuvre"
  exit 1
fi

# ── Paths ─────────────────────────────────────────────────────────────────────
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(dirname "$SCRIPT_DIR")"
VIDEO_DIR="$ROOT/public/videos/works"
THUMB_DIR="$ROOT/src/assets/images/works"
TMP_DIR="$(mktemp -d)"

mkdir -p "$VIDEO_DIR" "$THUMB_DIR"

echo ""
echo "  ▶ Fetching metadata..."

# ── Fetch metadata ────────────────────────────────────────────────────────────
META=$(yt-dlp --dump-json "$URL" 2>/dev/null)

RAW_DESCRIPTION=$(echo "$META" | python3 -c "
import json, sys
d = json.load(sys.stdin)
print(d.get('description', ''))
")

UPLOAD_YEAR=$(echo "$META" | python3 -c "
import json, sys
d = json.load(sys.stdin)
date = d.get('upload_date', '')
print(date[:4] if date else '')
")

# Split description: text before first hashtag / hashtags
CLEAN_DESCRIPTION=$(echo "$RAW_DESCRIPTION" | python3 -c "
import sys, re
text = sys.stdin.read().strip()
# Remove lines that are only dots (Instagram line breaks)
lines = [l for l in text.splitlines() if l.strip() not in ('', '.', '..', '...')]
# Split text vs hashtags
result = []
for line in lines:
    # Stop at hashtag-only lines
    if re.match(r'^#\w', line.strip()):
        break
    result.append(line.strip())
print(' '.join(result).strip())
")

HASHTAGS=$(echo "$RAW_DESCRIPTION" | python3 -c "
import sys, re
text = sys.stdin.read()
tags = re.findall(r'#\w+', text)
print(' '.join(tags))
")

echo "  ✓ Description: $CLEAN_DESCRIPTION"
echo "  ✓ Hashtags:    $HASHTAGS"
echo "  ✓ Year:        $UPLOAD_YEAR"
echo ""
echo "  ▶ Downloading: $URL"

# ── Download best MP4 ─────────────────────────────────────────────────────────
yt-dlp \
  --format "bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best" \
  --merge-output-format mp4 \
  --output "$TMP_DIR/source.%(ext)s" \
  --quiet --progress \
  "$URL"

SOURCE_MP4=$(find "$TMP_DIR" -name "source.mp4" | head -1)

if [[ -z "$SOURCE_MP4" ]]; then
  echo "✗ Download failed — no mp4 found in $TMP_DIR"
  ls "$TMP_DIR"
  exit 1
fi

echo ""
echo "  ✓ Downloaded: $(du -sh "$SOURCE_MP4" | cut -f1)"

# ── Re-encode MP4 (h264, web-optimised) ──────────────────────────────────────
echo "  ⟳ Encoding MP4..."
ffmpeg -i "$SOURCE_MP4" \
  -vcodec libx264 -crf 23 -preset slow \
  -acodec aac -b:a 128k \
  -movflags +faststart \
  -y "$VIDEO_DIR/$SLUG.mp4" \
  -loglevel error

echo "  ✓ MP4: public/videos/works/$SLUG.mp4 ($(du -sh "$VIDEO_DIR/$SLUG.mp4" | cut -f1))"

# ── Encode WebM (VP9) ─────────────────────────────────────────────────────────
echo "  ⟳ Encoding WebM..."
ffmpeg -i "$SOURCE_MP4" \
  -vcodec libvpx-vp9 -crf 32 -b:v 0 \
  -acodec libopus -b:a 96k \
  -y "$VIDEO_DIR/$SLUG.webm" \
  -loglevel error

echo "  ✓ WebM: public/videos/works/$SLUG.webm ($(du -sh "$VIDEO_DIR/$SLUG.webm" | cut -f1))"

# ── Extract thumbnail at 1s ───────────────────────────────────────────────────
echo "  ⟳ Extracting thumbnail..."
ffmpeg -i "$SOURCE_MP4" \
  -ss 00:00:01 -vframes 1 \
  -vf "scale=800:-1" \
  -q:v 3 \
  -y "$THUMB_DIR/$SLUG.jpg" \
  -loglevel error

echo "  ✓ Thumbnail: src/assets/images/works/$SLUG.jpg"

# ── Cleanup ───────────────────────────────────────────────────────────────────
rm -rf "$TMP_DIR"

# ── Camel-case slug for import name ──────────────────────────────────────────
IMPORT_NAME=$(echo "$SLUG" | python3 -c "
import sys, re
slug = sys.stdin.read().strip()
parts = re.split(r'[-_]', slug)
print(parts[0] + ''.join(p.capitalize() for p in parts[1:]) + 'Thumb')
")

# ── Use description or fallback ───────────────────────────────────────────────
DESC_FR="${CLEAN_DESCRIPTION:-...}"
DESC_EN="${CLEAN_DESCRIPTION:-...}"
YEAR="${UPLOAD_YEAR:-$(date +%Y)}"

# ── Next steps ────────────────────────────────────────────────────────────────
echo ""
echo "  ────────────────────────────────────────────────────"
echo "  Done! Add this to src/data/works.ts:"
echo ""
echo "  import $IMPORT_NAME from '../assets/images/works/$SLUG.jpg';"
echo ""
echo "  {"
echo "    id: '$SLUG',"
echo "    title: { fr: '...', en: '...' },"
echo "    description: { fr: '$DESC_FR', en: '$DESC_EN' },"
echo "    thumbnail: $IMPORT_NAME,"
echo "    video: '/videos/works/$SLUG.mp4',"
echo "    externalUrl: '$URL',"
echo "    year: $YEAR,"
echo "    featured: true,"
echo "  },"
if [[ -n "$HASHTAGS" ]]; then
  echo ""
  echo "  // Hashtags Instagram: $HASHTAGS"
fi
echo "  ────────────────────────────────────────────────────"
echo ""
