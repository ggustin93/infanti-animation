#!/usr/bin/env bash
# fetch-latest-reels.sh — List new Instagram reels not yet in works.ts
#
# Requires: instaloader (pip install instaloader)
#   OR: yt-dlp with browser cookies (--cookies-from-browser chrome|firefox|safari)
#
# Usage:
#   ./scripts/fetch-latest-reels.sh [username] [--limit N] [--browser chrome|firefox|safari]
#
# Examples:
#   ./scripts/fetch-latest-reels.sh                          # defaults to margot.infanti, limit 10
#   ./scripts/fetch-latest-reels.sh margot.infanti --limit 5
#   ./scripts/fetch-latest-reels.sh margot.infanti --browser firefox
#
# Output:
#   Lists URLs of new reels (not yet in works.ts) with suggested download commands

set -euo pipefail

# ── Args ──────────────────────────────────────────────────────────────────────
USERNAME="${1:-margot.infanti}"
LIMIT=10
BROWSER=""

shift 1 || true
while [[ $# -gt 0 ]]; do
  case "$1" in
    --limit)   LIMIT="${2:-10}"; shift 2 ;;
    --browser) BROWSER="${2:-chrome}"; shift 2 ;;
    *) echo "Unknown option: $1"; exit 1 ;;
  esac
done

# ── Paths ─────────────────────────────────────────────────────────────────────
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(dirname "$SCRIPT_DIR")"
WORKS_TS="$ROOT/src/data/works.ts"
TMP_DIR="$(mktemp -d)"
trap 'rm -rf "$TMP_DIR"' EXIT

echo ""
echo "  ▶ Profile: https://www.instagram.com/${USERNAME}/"
echo "  ▶ Checking last $LIMIT posts"
echo ""

# ── Extract existing Instagram URLs from works.ts ─────────────────────────────
EXISTING_IDS=$(grep 'externalUrl:' "$WORKS_TS" \
  | grep -oE '/(p|reel)/[A-Za-z0-9_-]+' \
  | grep -oE '[A-Za-z0-9_-]+$' \
  | sort)

# ── Fetch profile post list ───────────────────────────────────────────────────
fetch_with_instaloader() {
  python3 - <<PYEOF
import json, sys, re
try:
    import instaloader
except ImportError:
    print("INSTALOADER_NOT_FOUND", file=sys.stderr)
    sys.exit(1)

L = instaloader.Instaloader()
profile = instaloader.Profile.from_username(L.context, "${USERNAME}")

posts = []
count = 0
for post in profile.get_posts():
    if count >= ${LIMIT}:
        break
    if post.is_video:
        url = f"https://www.instagram.com/p/{post.shortcode}/"
        posts.append({
            "url": url,
            "shortcode": post.shortcode,
            "date": post.date.strftime("%Y%m%d"),
            "caption": post.caption or ""
        })
    count += 1

print(json.dumps(posts))
PYEOF
}

fetch_with_ytdlp() {
  local COOKIE_ARGS=""
  if [[ -n "$BROWSER" ]]; then
    COOKIE_ARGS="--cookies-from-browser $BROWSER"
  fi

  yt-dlp \
    --flat-playlist \
    --dump-single-json \
    --playlist-end "$LIMIT" \
    $COOKIE_ARGS \
    "https://www.instagram.com/${USERNAME}/" 2>/dev/null | python3 -c "
import json, sys, re

data = json.load(sys.stdin)
entries = data.get('entries', [])
posts = []
for e in entries:
    url = e.get('webpage_url') or e.get('url', '')
    if not url:
        continue
    m = re.search(r'/(p|reel)/([A-Za-z0-9_-]+)', url)
    sc = m.group(2) if m else ''
    posts.append({
        'url': url.rstrip('/') + '/',
        'shortcode': sc,
        'date': e.get('upload_date', ''),
        'caption': e.get('title', '')
    })
print(json.dumps(posts))
"
}

# Try instaloader first, then yt-dlp with cookies
echo "  ▶ Fetching post list..."
POSTS_JSON=""

if python3 -c "import instaloader" 2>/dev/null; then
  echo "  ✓ Using instaloader"
  POSTS_JSON=$(fetch_with_instaloader 2>/dev/null || echo "[]")
else
  if [[ -n "$BROWSER" ]]; then
    echo "  ✓ Using yt-dlp with $BROWSER cookies"
    POSTS_JSON=$(fetch_with_ytdlp 2>/dev/null || echo "[]")
  else
    echo ""
    echo "  ✗ Cannot fetch profile automatically."
    echo ""
    echo "  Two options:"
    echo ""
    echo "  1) Install instaloader (recommended, no login needed for public profiles):"
    echo "       pip install instaloader"
    echo "       ./scripts/fetch-latest-reels.sh"
    echo ""
    echo "  2) Use your browser's Instagram session:"
    echo "       ./scripts/fetch-latest-reels.sh --browser chrome    # or firefox / safari"
    echo ""
    exit 1
  fi
fi

# ── Compare against existing works ───────────────────────────────────────────
echo "$POSTS_JSON" | python3 - <<PYEOF
import json, sys, re

posts = json.loads(sys.stdin.read())
existing_ids = set("""${EXISTING_IDS}""".strip().split())

print(f"  ✓ Fetched {len(posts)} recent posts")
print()

def make_slug(caption, shortcode):
    clean = re.sub(r'#\w+', '', caption).strip()
    clean = re.sub(r'\s+', '-', re.sub(r'[^a-z0-9\s-]', '', clean.lower()))[:20].strip('-')
    return clean if clean else f"reel-{shortcode[:6].lower()}"

new_posts = [p for p in posts if p.get('shortcode', '') not in existing_ids]

if not new_posts:
    print("  ✓ All recent reels are already in works.ts — nothing new!")
else:
    print(f"  ⚡ {len(new_posts)} new reel(s) not in works.ts:")
    print()
    for i, p in enumerate(new_posts, 1):
        slug = make_slug(p.get('caption', ''), p.get('shortcode', ''))
        year = p['date'][:4] if p.get('date') else '?'
        print(f"  [{i}] {year}  {p['url']}")
        if p.get('caption'):
            preview = p['caption'][:80] + ('…' if len(p['caption']) > 80 else '')
            print(f"       Caption: {preview}")
        print(f"       Suggested slug: {slug}")
        print()

    print("  ────────────────────────────────────────────────────")
    print("  Download commands:")
    print()
    for p in new_posts:
        slug = make_slug(p.get('caption', ''), p.get('shortcode', ''))
        print(f"    ./scripts/download-reel.sh \"{p['url']}\" \"{slug}\"")
    print("  ────────────────────────────────────────────────────")
    print()
PYEOF
