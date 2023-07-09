export default class Slow {
    static xFactor = 1;

    static slow(x) {
        this.xFactor = this.xFactor * x;
        console.log(2000 * this.xFactor);
        document.getElementsByTagName('body')[0].style.setProperty('--animation-length', `${2000 * this.xFactor}ms`);
    }

    static randomSlow() {
        // Slow.slow(Random.get().randomItem([0, 0.5, 1, 2]));
    }

    static x() {
        return this.xFactor;
    }
}
