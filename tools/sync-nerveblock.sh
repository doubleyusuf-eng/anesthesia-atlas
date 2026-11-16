#!/bin/sh
# Copies the Nerve Block Atlas (local source repo ../AR-Sinir-Blogu) into site/nerve-block/.
# Only COMMITTED work is published: HEAD is exported to a temp folder, its check (local links,
# block files, region models, JS syntax) runs there, and only then is its site/ copied in.
# onizle.html is a model preview page for development and never ships.
set -e
HERE=$(cd "$(dirname "$0")/.." && pwd)
SRC=${NERVE_BLOCK_ATLAS:-"$HERE/../AR-Sinir-Blogu"}
TMP=$(mktemp -d)
trap 'rm -rf "$TMP"' EXIT
git -C "$SRC" archive HEAD | tar -x -C "$TMP"
( cd "$TMP" && node tools/check-site.mjs >/dev/null )
rsync -a --delete --exclude '.DS_Store' --exclude 'onizle.html' "$TMP/site/" "$HERE/site/nerve-block/"
echo "synced $(git -C "$SRC" rev-parse --short HEAD) -> site/nerve-block/"
