import fs from "fs";

export function inputFileToArray(filename, separator = ',', mapFn) {
    const inputString = fs.readFileSync(filename).toString();
    return inputToArray(inputString, separator, mapFn);
}

export function inputToArray(inputString, separator, mapFn) {
    const input = inputString.split(separator);
    return mapFn ? input.map(mapFn) : input;
}

export function sum(arr) {
    return arr.reduce((prev, curr) => prev + curr, 0);
}

export function unique(arr) {
    return arr.filter((e, i, a) => a.indexOf(e) === i);
}

export function intersect(arr1, arr2) {
    return arr1.filter(e => arr2.includes(e));
}

export function chunk(arr, size) {
    const chunks = [];
    const source = [...arr];
    while (source.length) chunks.push(source.splice(0, size));
    return chunks;
}

export function range(from, to) {
    if (!to && to !== 0) return range(0, from);
    [from, to] = [from, to].map(n => +n);
    return new Array(+to - +from + 1).fill(1).map((_, i) => +from + i);
}