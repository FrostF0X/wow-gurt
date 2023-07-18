export default class Grid {
    static CELL_COUNT = 8;
    static TOTAL_CELLS = 8 * 8;
    static toCellIndex = (col, row) => `${col}-${row}`;
    static animationDelay = (col, row) => {
        return Math.floor(Math.sqrt((col - 1) * (row - 1)));
    };
}
