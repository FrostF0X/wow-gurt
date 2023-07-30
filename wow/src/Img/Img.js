export default class Img {

    static all() {
        return ['unicorn', 'polihorseman', 'stardroid', 'coolshoe', 'gurtpin', 'sexydrugrabbit'];
    }

    static path(i, min) {
        if (min) {
            return `/assets/${i}-min.png`
        } else {
            return `/assets/${i}.png`
        }
    }
}
