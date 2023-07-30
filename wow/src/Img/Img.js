export default class Img {
    static path(i, min) {
        if (min) {
            return `/assets/${i}-min.png`
        } else {
            return `/assets/${i}.png`
        }
    }
}
