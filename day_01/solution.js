import { inputFileToArray, inputToArray, sum } from "../utils.js";

const [answer1, answer2] = solve();
console.log('PART ONE: ' + answer1);
console.log('PART TWO: ' + answer2);

function solve() {
    const elfInputs = inputFileToArray('input.txt', '\n\n');
    const elfBackpacks = elfInputs.map(input => inputToArray(input, '\n', e => Number(e)));
    const elfTotals = elfBackpacks.map(backpack => sum(backpack));
    elfTotals.sort((a, b) => b - a);
    return [elfTotals[0], sum(elfTotals.slice(0, 3))];
}
