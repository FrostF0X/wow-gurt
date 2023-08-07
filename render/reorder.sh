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
  PIXEL=$(magick "${FILES[$i]}" -format "%[pixel:u.p{0,0}]\n" info:)
  echo "${FILES[$i]}" "$PIXEL"
  if [[ $PIXEL == "srgba(36,36,0,1)" || $PIXEL == "srgba(0,0,0,1)" ]]; then
    START_FRAME=$i
    break
  fi
done

if [[ $START_FRAME -eq -1 ]]; then
  echo "Pink pixel not found!"
  exit 1
fi

for ((i = $START_FRAME; i < ${#FILES[@]}; i++)); do
  BASENAME=$(basename "${FILES[$i]}")

  # Extract the number from the filename (e.g., 01)
  NUM=$(echo "$BASENAME" | grep -o '[0-9]\+')

  # Format the number with leading zeros (e.g., 0001)
  PADDED_NUM="00${NUM}"

  # Construct the new filename
  NEWNAME="frame$PADDED_NUM.png"

  # Rename the file
  if [[ "$BASENAME" != "$NEWNAME" ]]; then
    mv "${FILES[$i]}" "$TMP_DIR/$NEWNAME"
  fi
done

for ((i = 0; i < $START_FRAME; i++)); do
  BASENAME=$(basename "${FILES[$i]}")

  # Extract the number from the filename (e.g., 01)
  NUM=$(echo "$BASENAME" | grep -o '[0-9]\+')

  PADDED_NUM="01${NUM}"
  # Construct the new filename
  NEWNAME="frame$PADDED_NUM.png"

  # Rename the file
  if [[ "$BASENAME" != "$NEWNAME" ]]; then
    mv "${FILES[$i]}" "$TMP_DIR/$NEWNAME"
  fi
done

# Combine frames back into GIF
ffmpeg -framerate 50 -i $TMP_DIR/frame%04d.png -c:v gif output.gif
# Clean up temporary files
rm -rf $TMP_DIR

echo "Done!"
