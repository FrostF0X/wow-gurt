export default class Img {

    static styleConfig = [];

    static all() {
        return ['unicorn', 'polihorseman', 'stardroid', 'coolshoe', 'gurtpin', 'sexydrugrabbit'];
    }
    static applyStyleConfig(styleConfig) {
        Img.styleConfig = styleConfig;
    }

    static path(i, type) {
        if (type && Img.styleConfig[type]) {
            return `/assets/${i}-${Img.styleConfig[type]}.png`
        } else {
            return `/assets/${i}.png`
        }
    }
}
