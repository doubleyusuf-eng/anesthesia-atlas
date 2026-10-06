#!/bin/sh
# Copies the Advanced Monitoring Atlas (private source repo) into site/advanced-monitoring/.
# Only COMMITTED work is published: HEAD is exported to a temp folder, its check runs there,
# and only then is its site/ copied in. Uncommitted files and ignored ones (refs/, _*.html) never ship.
set -e
HERE=$(cd "$(dirname "$0")/.." && pwd)
SRC=${MONITORING_ATLAS:-"$HERE/../Ileri-Cihaz-Atlasi"}
TMP=$(mktemp -d)
trap 'rm -rf "$TMP"' EXIT
git -C "$SRC" archive HEAD | tar -x -C "$TMP"
( cd "$TMP" && node tools/check-site.cjs )
rsync -a --delete --exclude '.DS_Store' "$TMP/site/" "$HERE/site/advanced-monitoring/"
echo "synced $(git -C "$SRC" rev-parse --short HEAD) -> site/advanced-monitoring/"
