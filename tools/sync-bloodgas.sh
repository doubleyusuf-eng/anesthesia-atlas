#!/bin/sh
# Copies the Blood Gas Atlas (local source repo) into site/blood-gas/.
# Only COMMITTED work is published: HEAD is exported to a temp folder, its check (syntax, message templates,
# content build and engine tests) runs there, and only then is its site/ copied in.
# Ignored files (site/_*.html scratch pages, site/data/_*.json) are not in HEAD and never ship.
set -e
HERE=$(cd "$(dirname "$0")/.." && pwd)
SRC=${BLOOD_GAS_ATLAS:-"$HERE/../Kan-Gazi-Atlasi"}
TMP=$(mktemp -d)
trap 'rm -rf "$TMP"' EXIT
git -C "$SRC" archive HEAD | tar -x -C "$TMP"
( cd "$TMP" && node tools/check-site.cjs >/dev/null )
rsync -a --delete --exclude '.DS_Store' "$TMP/site/" "$HERE/site/blood-gas/"
echo "synced $(git -C "$SRC" rev-parse --short HEAD) -> site/blood-gas/"
