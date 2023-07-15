import "./Common/Primitives";
import Random from "./Random";

enum Direction {
    COL, ROW
}

export class AreaDivider {
    private readonly levelsConfig: number[];
    private random: Random;
    private readonly cols: number;
    private readonly rows: number;

    constructor(levelsConfig: number[], cols: number, rows: number, random: Random) {
        this.random = random;
        this.levelsConfig = levelsConfig;
        this.cols = cols;
        this.rows = rows;
    }

    public divide() {
        return new AreaDivision(1, this.cols, 1, this.rows,
            this.getDivisionForLevel(0, 1, this.cols, 1, this.rows)
        );
    }

    private getDivisionForLevel(level: number, startCol: number, endCol: number, startRow: number, endRow: number): AreaDivision[] {
        if (level > this.levelsConfig.length) {
            return [];
        }
        const direction = this.random.bool() ? Direction.COL : Direction.ROW;
        if (direction === Direction.ROW) {
            const colSpan = endCol - startCol + 1;
            let chunkDivision = [startCol, endCol];
            const chunkCount = this.random.number(2, this.levelsConfig[level - 1]);
            if (colSpan > 2) {
                chunkDivision = [startCol, ...this.random.randomItems(Array.range(startCol + 1, endCol - 1), chunkCount - 1).sort(), endCol];
            }
            const chunks = [];
            for (let i = 0; i < chunkDivision.length - 1; i++) {
                if (i !== 0) {
                    chunks.push([chunkDivision[i] + 1, chunkDivision[i + 1]]);
                } else {
                    chunks.push([chunkDivision[i], chunkDivision[i + 1]]);
                }
            }
            return chunks.map((chunk) =>
                new AreaDivision(chunk[0], chunk[1], startRow, endRow,
                    this.getDivisionForLevel(level + 1, chunk[0], chunk[1], startRow, endRow))
            );
        } else {
            const rowSpan = endRow - startRow + 1;
            let chunkDivision = [startRow, endRow];
            const chunkCount = this.random.number(2, this.levelsConfig[level - 1]);
            if (rowSpan > 2) {
                chunkDivision = [startRow, ...this.random.randomItems(Array.range(startRow + 1, endRow - 1), chunkCount - 1).sort(), endRow];
            }
            const chunks = [];
            for (let i = 0; i < chunkDivision.length - 1; i++) {
                if (i !== 0) {
                    chunks.push([chunkDivision[i] + 1, chunkDivision[i + 1]]);
                } else {
                    chunks.push([chunkDivision[i], chunkDivision[i + 1]]);
                }
            }
            return chunks.map((chunk) =>
                new AreaDivision(startCol, endCol, chunk[0], chunk[1],
                    this.getDivisionForLevel(level + 1, startCol, endCol, chunk[0], chunk[1]))
            );
        }
    }

}

export class AreaDivision {
    public startCol: number;
    public endCol: number;
    public startRow: number;
    public endRow: number;
    public cols: number;
    public rows: number;
    public subdivisions: AreaDivision[];

    constructor(startCol: number, endCol: number, startRow: number, endRow: number, subdivisions: AreaDivision[]) {
        this.startCol = startCol;
        this.endCol = endCol;
        this.startRow = startRow;
        this.endRow = endRow;
        this.cols = this.endCol - this.startCol + 1;
        this.rows = this.endRow - this.startRow + 1;
        this.subdivisions = subdivisions;
    }

    flatten(): AreaDivision[] {
        return this.subdivisions.length > 0 ? this.subdivisions.flatMap((subdivision) => subdivision.flatten()) : [this];
    }
}
