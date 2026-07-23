#!/usr/bin/env bash
# Copy final defense deck into web/public/defense for Cloudflare Pages (same project as the game).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
SRC="${ROOT}/research/ppt"
DEST="${ROOT}/web/public/defense"
mkdir -p "${DEST}/images"
cp "${SRC}/reframe-destiny-defense-swiss-final.html" "${DEST}/index.html"
rsync -a --delete "${SRC}/images/" "${DEST}/images/"
if [[ -f "${SRC}/assets/motion.min.js" ]]; then
  mkdir -p "${DEST}/assets"
  cp "${SRC}/assets/motion.min.js" "${DEST}/assets/"
fi
echo "Synced deck → web/public/defense/"
echo "After git push + Pages deploy, open:"
echo "  https://reframe-destiny.pages.dev/defense/"
echo "  https://reframe-destiny.pages.dev/defense/index.html"
