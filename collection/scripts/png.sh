export DIR="$1"
export OUTPUT="$2"
cd $DIR
mkdir -p "$OUTPUT" || true
find . -name "*.avif" | xargs -P 50 -I {} bash -c "convert {} ${OUTPUT}/{}.png"
