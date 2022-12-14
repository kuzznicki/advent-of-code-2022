import { EOL } from "os";
import { inputFileToArray, unique } from "./utils.js";

const steps = getStepsFromInput();
console.log('PART ONE: ' + solve(steps, 2));
console.log('PART TWO: ' + solve(steps, 10));

function getStepsFromInput() {
    const steps = [];
    const lines = inputFileToArray('input.txt', EOL);
    const motions = lines.map(line => line.split(' '));

    motions.forEach(([dir, val]) => {
        steps.push(...new Array(+val).fill(0).map(() => {
            switch(dir) {
                case 'U': return [0, 1];
                case 'R': return [1, 0];
                case 'D': return [0, -1];
                case 'L': return [-1, 0];
                default: return [0, 0];
            }
        }));
    });

    return steps;
}

function solve(steps, knotsCnt) {
    let knots = new Array(knotsCnt).fill(0).map(e => [0, 0]);
    const tailPositions = [[0, 0]];

    steps.forEach(step => {
        const head = knots[0];
        head[0] += step[0];
        head[1] += step[1];

        for (let i = 1; i < knots.length; i++) {
            const move = getFollowingKnotMove(knots[i - 1], knots[i]);
            if (!move) continue;

            knots[i][0] += move[0];
            knots[i][1] += move[1];

            if (i === knots.length - 1) tailPositions.push([...knots[i]]);
        }
    });

    return unique(tailPositions.map(([x,y]) => x + ',' + y)).length;
}

function getFollowingKnotMove(knot, followingKnot) {
    const xDiff = knot[0] - followingKnot[0];
    const yDiff = knot[1] - followingKnot[1];
    const touching = Math.abs(xDiff) <= 1 && Math.abs(yDiff) <= 1;

    return touching ? null : [
        xDiff === 0 ? 0 : xDiff / Math.abs(xDiff),
        yDiff === 0 ? 0 : yDiff / Math.abs(yDiff)
    ];
}