export function throwExpression(errorMessage: string): never {
    throw new Error(errorMessage);
}

export function errorInfo(e: unknown): string {
    if (e instanceof Error) {
        return `${e.message} ${e.stack}`;
    } else {
        return JSON.stringify(e);
    }
}

function doubleDigit(digit: number) {
    if (digit < 10) {
        return `0${digit}`;
    }
    return `${digit}`;
}

function tripleDigit(digit: number) {
    if (digit < 10) {
        return `00${digit}`;
    }
    if (digit < 100) {
        return `0${digit}`;
    }
    return `${digit}`;
}

export function logTime() {
    const d = new Date();
    return `${doubleDigit(d.getDate())}/${doubleDigit(d.getMonth() + 1)}/${doubleDigit(d.getFullYear())} @ ${doubleDigit(d.getHours())}:${doubleDigit(d.getMinutes())}:${doubleDigit(d.getSeconds())}:${tripleDigit(d.getMilliseconds())}`;
}

export function clog(m: string) {
    console.log(`[${logTime()}] ${m}`);
}

export function cerror(m: string) {
    console.error(`[${logTime()}] ${m}`);
}

export function range(start: number, finish: number): number[] {
    const length = finish - start + 1 > 0 ? finish - start + 1 : 0;
    return [...Array(length).keys()].map(i => i + start);
}
