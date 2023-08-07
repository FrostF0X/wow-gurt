#!/bin/bash

# Usage: ./scriptname.sh input.gif output.gif

INPUT_GIF=$1
OUTPUT_GIF=$2
TMP_DIR=$3

# Split the GIF into individual frames
ffmpeg -i "$INPUT_GIF" -vsync 0 "$TMP_DIR/frame%d.png"

# Find the frame with the pink pixel at 1x1 position
START_FRAME=-1

# Sort by the number after "frame" to get them in numerical order
find "$TMP_DIR" -name 'frame*.png' | sort -t e -k 2 -n | while read -r FILE; do
  BASENAME=$(basename "$FILE")
  # Extract the frame number and pad with zeros to get 2 digits
  NUM=$(printf "%02d" $(echo "$BASENAME" | grep -o '[0-9]\+'))
  NEWNAME="frame$NUM.png"
  if [[ "$BASENAME" != "$NEWNAME" ]]; then
    mv "$FILE" "$TMP_DIR/$NEWNAME"
  fi
done

FILES=($TMP_DIR/*.png)
for ((i = 0; i < ${#FILES[@]}; i++)); do
  PIXEL=$(magick "${FILES[$i]}" -format "%[hex:u.p{1,1}]\n" info:)
  echo "${FILES[$i]}" "$PIXEL"
  if [[ $PIXEL == "#EA42A7" ]]; then
    START_FRAME=$i
    break
  fi
done

if [[ $START_FRAME -eq -1 ]]; then
  echo "Pink pixel not found!"
  exit 1
fi

# Reorder the frames
REORDERED_FRAMES=()
for ((i = $START_FRAME; i < ${#FILES[@]}; i++)); do
  REORDERED_FRAMES+=(${FILES[$i]})
done

for ((i = 0; i < $START_FRAME; i++)); do
  REORDERED_FRAMES+=(${FILES[$i]})
done

# Combine frames back into GIF
convert -loop 0 "${REORDERED_FRAMES[@]}" $OUTPUT_GIF

# Clean up temporary files
rm -rf $TMP_DIR

echo "Done!"
