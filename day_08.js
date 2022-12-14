import { EOL } from "os";
import { inputFileToArray, sum } from "./utils.js";

const [answer1, answer2] = solve();
console.log('PART ONE: ' + answer1);
console.log('PART TWO: ' + answer2);

function solve() {
    const lines = inputFileToArray('input.txt', EOL);
    const rows = lines.map(str => str.split('').map(Number));
    const colCnt = rows[0].length;

    // result map, same size as input, 1 - visible, 0 - not visible
    const res = new Array(rows.length).fill([]).map(e => new Array(colCnt).fill(1));
    let topViewScore = 0;

    for (let r = 0; r < res.length; r++) {
        for (let c = 0; c < colCnt; c++) {
            const [visible, viewScore] = check(rows, r, c);
            res[r][c] = visible ? 1 : 0;
            topViewScore = Math.max(topViewScore, viewScore);
        }
    }

    return [sum(res.map(row => sum(row))), topViewScore];
}

function check(rows, row, col) {
    const tree = rows[row][col];
    const view = { left: 0, right: 0, up: 0, down: 0 };
    const hidden = { left: false, right: false, up: false, down: false };
    let hiddenInAllDirs = false;

    const yMax = Math.max(row, rows.length - 1 - row);
    const xMax = Math.max(col, rows[0].length - 1 - col);
    const max = Math.max(xMax, yMax);

    for (let offset = 1; offset <= max; offset++) {
        const treesByDir = getTreesWithOffset(rows, row, col, offset);

        Object.keys(treesByDir).forEach(dir => {
            if (hidden[dir] || treesByDir[dir] === null) return;
            hidden[dir] = hidden[dir] || treesByDir[dir] >= tree;
            view[dir] = offset;
        });

        if (hiddenInAllDirs = !Object.values(hidden).some(e => !e)) break;
    }

    const viewScore = Object.values(view).reduce((acc, v) => acc * v, 1);
    return [!hiddenInAllDirs, viewScore];
}

function getTreesWithOffset(rows, y, x, offset) {
    return {
        left: rows[y]?.[x - offset] ?? null,
        right: rows[y]?.[x + offset] ?? null,
        up: rows[y - offset]?.[x] ?? null,
        down: rows[y + offset]?.[x] ?? null
    }
}