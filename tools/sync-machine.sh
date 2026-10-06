#!/bin/sh
# Copies the Anesthesia Machine Atlas (private source repo) into site/anesthesia-machine/.
# Its own checks run first, so a failing atlas never reaches the publish repo.
set -e
HERE=$(cd "$(dirname "$0")/.." && pwd)
SRC=${MACHINE_ATLAS:-"$HERE/../Anestezi-Atlasi"}
( cd "$SRC" && node --test tests/*.test.cjs >/dev/null && node tools/check-site.cjs )
rsync -a --delete --exclude '.DS_Store' "$SRC/site/" "$HERE/site/anesthesia-machine/"
echo "synced $(cd "$SRC" && git rev-parse --short HEAD) -> site/anesthesia-machine/"
