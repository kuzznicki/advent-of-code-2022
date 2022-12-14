import { EOL } from "os";
import { inputFileToArray, inputToArray, sum } from "../utils.js";

const [answer1, answer2] = solve();
console.log('PART ONE: ' + answer1);
console.log('PART TWO: ' + answer2);

function solve() {
    const pairStrings = inputFileToArray('input.txt', EOL + EOL)
    const pairs = pairStrings.map(pairStr => inputToArray(pairStr, EOL, JSON.parse));

    // Part 1:
    const pairsInRightOrder = [];
    pairs.forEach(([left, right], i) => {
        const order = compare(left, right);
        if (order !== -1) pairsInRightOrder.push(i + 1);
    });

    // Part 2:
    const divider1 = [[2]];
    const divider2 = [[6]];

    const allPackets = [divider1, divider2];
    pairs.forEach(([left, right]) => allPackets.push(left, right));
    allPackets.sort((a, b) => compare(b, a));

    const posOfDivider1 = 1 + allPackets.findIndex(e => compare(e, divider1) === 0);
    const posOfDivider2 = 1 + allPackets.findIndex(e => compare(e, divider2) === 0);

    return [sum(pairsInRightOrder), posOfDivider1 * posOfDivider2];
}

function compare(left, right) {
    if (!left && left !== 0) return 1;
    if (!right && right !== 0) return -1;

    if (Array.isArray(left) || Array.isArray(right)) {
        const leftArr = Array.isArray(left) ? left : [left];
        const rightArr = Array.isArray(right) ? right : [right];
        return compareArrays(leftArr, rightArr);
    }

    if (left === right) return 0;
    return left < right ? 1 : -1;
}

function compareArrays(left, right) {
    const maxLen = Math.max(left.length, right.length);

    for (let i = 0; i < maxLen; i++) {
        const order = compare(left[i], right[i]);
        if (order !== 0) return order;
    }

    return 0;
}
