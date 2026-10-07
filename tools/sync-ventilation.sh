#!/bin/sh
# Copies the Mechanical Ventilation Atlas (private source repo) into site/mechanical-ventilation/.
# Only COMMITTED work is published: HEAD is exported to a temp folder, its check runs there,
# and only then is its site/ copied in. Uncommitted files and ignored ones (content-src/i18n/todo/, _l3.html) never ship.
set -e
HERE=$(cd "$(dirname "$0")/.." && pwd)
SRC=${VENTILATION_ATLAS:-"$HERE/../Mekanik-Ventilasyon-Atlasi"}
TMP=$(mktemp -d)
trap 'rm -rf "$TMP"' EXIT
git -C "$SRC" archive HEAD | tar -x -C "$TMP"
( cd "$TMP" && node tools/check-site.cjs )
rsync -a --delete --exclude '.DS_Store' "$TMP/site/" "$HERE/site/mechanical-ventilation/"
echo "synced $(git -C "$SRC" rev-parse --short HEAD) -> site/mechanical-ventilation/"
