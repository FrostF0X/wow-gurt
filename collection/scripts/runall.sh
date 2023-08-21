export DIR="$1"
export OUTPUT="$2"
export COMMAND="$3"
cd $DIR
mkdir -p "$OUTPUT" || true
find . -type file -name "*" | xargs -S 100000 -P 50 -I {} bash -c "convert {} ${COMMAND} ${OUTPUT}/{}"
