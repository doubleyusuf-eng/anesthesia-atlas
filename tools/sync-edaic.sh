#!/bin/sh
# Copies the EDAIC Exam Atlas (local source repo ../EDAIC-Sinav-Atlasi) into site/edaic/.
# Only COMMITTED work is published: HEAD is exported to a temp folder, its check (local links,
# JS syntax, source markers, components, tabs) runs there, and only then is its site/ copied in.
set -e
HERE=$(cd "$(dirname "$0")/.." && pwd)
SRC=${EDAIC_ATLAS:-"$HERE/../EDAIC-Sinav-Atlasi"}
TMP=$(mktemp -d)
trap 'rm -rf "$TMP"' EXIT
git -C "$SRC" archive HEAD | tar -x -C "$TMP"
( cd "$TMP" && node tools/check-site.cjs >/dev/null )
rsync -a --delete --exclude '.DS_Store' "$TMP/site/" "$HERE/site/edaic/"
echo "synced $(git -C "$SRC" rev-parse --short HEAD) -> site/edaic/"
