export default class Grid {
    static CELL_COUNT = 8;
    static TOTAL_CELLS = 8 * 8;

    static toCellIndex = (i, j) => ((i - 1) * 8 + j);
    static animationDelay = (i, j) => {
        return Math.floor(Math.sqrt((i - 2) * (j - 2)));
    };
}
