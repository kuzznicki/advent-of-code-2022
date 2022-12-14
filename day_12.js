import { EOL } from "os";
import { inputFileToArray } from "./utils.js";

const [answer1, answer2] = solve();
console.log('PART ONE: ' + answer1);
console.log('PART TWO: ' + answer2);

function solve() {
    const lines = inputFileToArray('input.txt', EOL);
    const map = lines.map(line => line.split(''));

    // Part 1:
    const start = findPosByVal(map, 'S'); 
    const end = findPosByVal(map, 'E');
    const shortestDistFromStart = findShortestPath(map, start, end);

    // Part 2:
    const lowestFields = [];
    
    map.forEach((row, y) => {
        row.forEach((field, x) => {
            if (field === 'a' || field === 'S') lowestFields.push([x, y]);;
        });
    });

    const shortestDistFromLowestFields = lowestFields.map(pos => {
        return findShortestPath(map, pos, end);
    }).filter(e => !!e).sort()[0];

    return [shortestDistFromStart, shortestDistFromLowestFields];
}

function findPosByVal(map, val) {
    const y = map.findIndex(row => row.includes(val));
    if (isNaN(y)) throw new Error('failed to find any `y` for `' + val + '` field');

    const x = map[y].findIndex(col => col === val);
    if (isNaN(y)) throw new Error('failed to find any `x` for `' + val + '` field');

    return [x, y];
}

function findShortestPath(map, startPos, endPos, visited = {}) { // A* alg
    const markAsVisited = (pos) => {
        const [x, y] = pos;
        visited[y] = visited[y] || [];
        visited[y][x] = true;
    };
    
    const fieldsToCheck = [createField(startPos, endPos)];
    markAsVisited(startPos);
    
    while (fieldsToCheck.length) {
        const { x, y, g } = fieldsToCheck.shift();

        if (x === endPos[0] && y === endPos[1]) {
            return g;
        }

        const nextFields = getAvailableSteps(map, [x, y])
            .filter(([x, y]) => !visited[y]?.[x])
            .map(([x, y]) => {
                markAsVisited([x, y]);
                return createField([x, y], endPos, g + 1)
            });

        fieldsToCheck.push(...nextFields);
        fieldsToCheck.sort((a, b) => a.f - b.f);
    }
    
    return null;
}

function createField(pos, endPos, g = 0) {
    // g - walking cost from the start to the current field
    // h - walking cost from the current field to the end without obstacles
    // f = g + h
    const [x, y] = pos;
    const h = calcDist(pos, endPos);
    const f = h + g;
    return { x, y, g, h, f };
};

function calcDist(p1, p2) {
    return Math.abs(p1[0] - p2[0]) + Math.abs(p1[1] - p2[1]);
}

function getAvailableSteps(map, currentPos) {
    const [x, y] = currentPos;
    const currentCode = getLetterCode(map[y][x]);

    return [
        [x, y + 1],
        [x, y - 1],
        [x + 1, y],
        [x - 1, y]
    ].filter(([x, y]) => {
        return map[y] && map[y][x] && (getLetterCode(map[y][x]) - currentCode <= 1);
    });
}

function getLetterCode(letter) {
    if (letter === 'S') return 'a'.charCodeAt(0);
    if (letter === 'E') return 'z'.charCodeAt(0);
    return letter.charCodeAt(0);
}
