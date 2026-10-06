#!/bin/sh
# Copies the Anesthesia Machine Atlas (private source repo) into site/anesthesia-machine/.
# Only COMMITTED work is published: HEAD is exported to a temp folder, its checks run there,
# and only then is its site/ copied in. Uncommitted files in the source repo never ship.
set -e
HERE=$(cd "$(dirname "$0")/.." && pwd)
SRC=${MACHINE_ATLAS:-"$HERE/../Anestezi-Atlasi"}
TMP=$(mktemp -d)
trap 'rm -rf "$TMP"' EXIT
git -C "$SRC" archive HEAD | tar -x -C "$TMP"
( cd "$TMP" && node --test tests/*.test.cjs >/dev/null && node tools/check-site.cjs )
rsync -a --delete --exclude '.DS_Store' "$TMP/site/" "$HERE/site/anesthesia-machine/"
echo "synced $(git -C "$SRC" rev-parse --short HEAD) -> site/anesthesia-machine/"
