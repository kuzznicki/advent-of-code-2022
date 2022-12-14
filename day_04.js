import { EOL } from "os";
import { inputFileToArray, intersect, range } from "./utils.js";

const [answer1, answer2] = solve();
console.log('PART ONE: ' + answer1);
console.log('PART TWO: ' + answer2);

function solve() {
    const pairs = inputFileToArray('input.txt', EOL);
    let fullyContains = 0;
    let overlaps = 0;

    for (const pair of pairs) {
        const ranges = pair.split(',');
        const [areas1, areas2] = ranges.map(r => {
            const [first, last] = r.split('-');
            return range(first, last);
        });

        const shared = intersect(areas1, areas2);
        
        if (shared.length) {
            overlaps++;
        }

        if ([areas1.length, areas2.length].includes(shared.length)) {
            fullyContains++;
        }
    }

    return [fullyContains, overlaps];
}