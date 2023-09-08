export default class EventQ {
    listeners = [];

    constructor() {
        this.listeners = [];
    }

    static n() {
        return new EventQ();
    }

    emmit = (value) => {
        this.listeners.forEach(l => l(value));
    };

    listen = listener => {
        this.listeners.push(listener);
    };
}
