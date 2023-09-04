export default class EventQ {
    listeners = [];

    constructor() {
        this.listeners = [];
    }

    static n() {
        return new EventQ();
    }

    emmit = () => {
        this.listeners.forEach(l => l());
    };

    listen = listener => {
        this.listeners.push(listener);
    };
}
