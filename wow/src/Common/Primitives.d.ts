declare interface StringConstructor {
    shuffle(): string;
}

declare interface Array<T> {
    randoms(number: number): T[];
}

declare interface NumberConstructor {
    random(min: number, max: number): number;

    beautiful(): number;
}

declare interface ArrayConstructor {
    range(start: number, finish): number[];

    combinations(arrays: any[][]): any[][];
}

declare var String: NumberConstructor;
declare var Number: NumberConstructor;
// eslint-disable-next-line @typescript-eslint/no-redeclare
declare var Array: ArrayConstructor;
