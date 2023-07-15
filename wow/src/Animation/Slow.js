export default class Slow {
    static xFactor = 1;

    static slow(x) {
        this.xFactor = x;
    }

    static slow2(el) {
        el.style.setProperty('--animation-length', `${2000 * this.xFactor}ms`);
    }

    static x() {
        return this.xFactor;
    }
}
