export default class BrowserOrientation {

    static listen(callback) {
        const listener = (portrait) => {
            if (portrait) {
                callback('portrait');
            } else {
                callback('landscape');
            }
        }
        window.matchMedia("(orientation: portrait)").addEventListener("change", e => listener(e.matches));
    }

    static get() {
        return window.matchMedia("(orientation: portrait)").matches ? 'portrait' : 'landscape';
    }
}
