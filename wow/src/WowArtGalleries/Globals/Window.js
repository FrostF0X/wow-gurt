export default class Window {
    static width() {
        return Math.max(window.document.documentElement.clientWidth || 0, window.innerWidth || 0);
    }
}
