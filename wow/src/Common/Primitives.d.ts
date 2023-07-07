declare interface StringConstructor {
    shuffle(): string;
}

declare interface Array<T> {
    randoms(number: number): T[];
}

declare interface NumberConstructor {
    random(min: number, max: number): number;
}

declare interface ArrayConstructor {
    range(start: number, finish): number[];
}

declare var String: NumberConstructor;
declare var Number: NumberConstructor;
// eslint-disable-next-line @typescript-eslint/no-redeclare
declare var Array: ArrayConstructor;