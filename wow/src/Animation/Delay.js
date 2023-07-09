import Random from "../Random";

export default class Delay {
    static delay(x) {
        document.getElementsByTagName('body')[0].style.setProperty('--animation-delay-multiplier', x);
    }

    static randomDelay() {
        Delay.delay(Random.get().randomItem([0, 0.25, 0.5, 0.75, 1, 1.5, 2, 3, 4]));
    }
}
