#!/bin/bash

# Usage: ./scriptname.sh input.gif output.gif

INPUT_GIF=$1
OUTPUT_GIF=$2
TMP_DIR=$3

# Split the GIF into individual frames
ffmpeg -i "$INPUT_GIF" -vsync 0 "$TMP_DIR/frame%d.png"

# Find the frame with the pink pixel at 1x1 position
START_FRAME=-1
FILES=($TMP_DIR/*.png)
for ((i = 0; i < ${#FILES[@]}; i++)); do
  PIXEL=$(convert ${FILES[$i]} -crop 1x1+1+1 -format "%[pixel:u.p{0,0}]" info:)
  echo "$PIXEL";
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
