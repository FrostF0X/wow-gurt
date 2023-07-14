export default class Delay {
    static variants = [0, 0.25, 0.5, 0.75, 1, 1.5, 2, 3, 4];

    static delay(x, el) {
        el.style.setProperty('--animation-delay-multiplier', x);
    }
}
