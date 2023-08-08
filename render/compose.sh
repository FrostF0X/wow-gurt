#!/usr/bin/env bash

INPUT="$1"
OUTPUT="$2"
TMP=$(mktemp -d)
echo "$TMP"
FILES=("$INPUT/"*.gif)
for ((i = 0; i < ${#FILES[@]}; i++)); do
  filename=$(basename "${FILES[$i]}")
  ./reorder.sh "${FILES[$i]}" "$TMP/$filename" $(mktemp -d)
done

find "$TMP" -name '*.gif' | sort -t e -k 2 -n | while read -r FILE; do
  echo "file $FILE" >> "$TMP/input.txt"
done

ffmpeg -f concat -safe 0 -i "$TMP/input.txt" -filter:v fps=50 $OUTPUT
