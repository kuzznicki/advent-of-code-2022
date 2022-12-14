import { EOL } from "os";
import { inputFileToArray, chunk } from "./utils.js";

const [answer1, answer2] = solve();
console.log('PART ONE: ' + answer1);
console.log('PART TWO: ' + answer2);

function solve() {
    const lines = inputFileToArray('input.txt', EOL);
    const [crates, moves] = readInputLines(lines);
    return [
        cratesToSolution(moveCrates(crates, moves, 'CrateMover 9000')),
        cratesToSolution(moveCrates(crates, moves, 'CrateMover 9001'))
    ];
}

function readInputLines(inputLines) {
    const crates = [], moves = [];

    for (const line of inputLines) {
        if (line.includes('[')) {
            const chunks = chunk(line.split(''), 4);

            chunks.forEach((chunq, i) => {
                if (chunq[0] !== '[') return;
                crates[i] = (crates[i] || []);
                crates[i].push(chunq[1]);
            });

        } else if (line.slice(0, 4) === 'move') {
            const [move, from, to] = line.split(' ').map(Number).filter(e => !isNaN(e));
            moves.push({ move, from, to });
        }
    }

    return [crates.map(col => col.reverse()), moves];
}

function moveCrates(initialCrates, moves, crane) {
    const crates = initialCrates.map(col => [...col]);
    
    moves.forEach(({ move, from, to }) => {
        const movingCrates = crates[from - 1].splice(-move);
        if (crane !== 'CrateMover 9001') movingCrates.reverse();
        crates[to - 1].push(...movingCrates);
    });

    return crates;
}

function cratesToSolution(crates) {
    return crates.map(cratesColumn => cratesColumn.slice(-1)).join('');
}
