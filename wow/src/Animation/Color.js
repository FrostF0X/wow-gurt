export default class Color {
    static colors = {
        'pink': '#e82099',
        'green': '#9DD544FF',
        'black': '#000000',
        'gray': '#a9cee5',
        'blue': '#0047FF',
        'orange': '#ffa418',
        'violet': '#6805d3',
    };
    static variants = [
        [Color.colors.pink, Color.colors.violet],
        [Color.colors.orange, Color.colors.violet],
        [Color.colors.green, Color.colors.violet],
        [Color.colors.gray, Color.colors.violet],
        [Color.colors.pink, Color.colors.green],
        [Color.colors.pink, Color.colors.blue],
        [Color.colors.pink, Color.colors.orange],
        [Color.colors.pink, Color.colors.violet],
        [Color.colors.blue, Color.colors.green],
        [Color.colors.blue, Color.colors.gray],
        [Color.colors.black, Color.colors.gray],
    ];

    static setColors(one, two, el) {
        el.style.setProperty('--chess-color-1', one);
        el.style.setProperty('--chess-color-2', two);
    }
}
