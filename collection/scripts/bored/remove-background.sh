DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

colors_neon=(
  '-transparent "#17e6b7"'
  '-transparent "#16e2b4"'
  '-transparent "#16e4b5"'
  '-transparent "#14c79e"'
  '-transparent "#16e6b7"'
  '-transparent "#16e5b6"'
  '-transparent "#17ecbc"'
  '-transparent "#17f2c1"'
  '-transparent "#13b590"'
  '-transparent "#0e8b6f"'
  '-transparent "#0c755d"'
  '-transparent "#16e3b4"'
  '-transparent "#15cda4"'
  '-transparent "#15cda4"'
  '-transparent "#16e4b5"'
)
"$DIR/../runall.sh" "$1" "$2" "${colors_neon[*]}"
