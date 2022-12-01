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