import Random from "../Random";

export default class Cools {
    static generate() {
        const w = ['starry', 'shiny', 'zippy', 'cherry', 'absolutely', `epic`, 'glitchy', 'richy', 'jazzy', 'pinky', 'wavy', 'vibey', 'lightning', 'funky', 'disco', 'ravey'];
        return Random.fresh(Number.random(0, Number.MAX_SAFE_INTEGER)).randomItems(w, 6).map(i => `+${i}+`).join(' ');
    }
}
