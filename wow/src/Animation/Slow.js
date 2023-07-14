export default class Slow {
    static xFactor = 1;

    static slow(x, el) {
        this.xFactor = x;
        el.style.setProperty('--animation-length', `${2000 * this.xFactor}ms`);
    }

    static x() {
        return this.xFactor;
    }
}
