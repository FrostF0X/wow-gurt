#!/usr/bin/env bash

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

mkdir "$SCRIPT_DIR/resized"
for filename in "$SCRIPT_DIR"/*.avif; do
  file=$(basename "$filename" .avif)
  convert -resize 1000 "$SCRIPT_DIR/${file}.avif" "$SCRIPT_DIR/resized/${file}.avif"
  convert -scale 10% -blur 0x5 -resize 1000% "$SCRIPT_DIR/${file}.avif" "$SCRIPT_DIR/resized/${file}_blur_light.avif"
  convert -scale 5% -blur 0x10 -resize 2000% "$SCRIPT_DIR/${file}.avif" "$SCRIPT_DIR/resized/${file}_blur_ultra.avif"
  convert "$SCRIPT_DIR/resized/${file}_blur_light.avif" -bordercolor black -fill white \( -clone 0 -colorize 100 -shave 50x50 -border 50x50 -blur 0x80 \) -compose copyopacity -composite "$SCRIPT_DIR/resized/${file}_blur_fade.avif"
#  convert -resize 500 "$SCRIPT_DIR/${file}_blur_light.avif" "$SCRIPT_DIR/${file}_blur_light.avif"
#  convert -resize 500 "$SCRIPT_DIR/${file}_blur_ultra.avif" "$SCRIPT_DIR/${file}_blur_ultra.avif"
#  convert -resize 500 "$SCRIPT_DIR/${file}_blur_fade.avif" "$SCRIPT_DIR/${file}_blur_fade.avif"
done
