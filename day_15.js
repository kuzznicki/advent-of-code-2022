import { EOL } from "os";
import { inputFileToArray, dist, range } from "./utils.js";

const PART_1_Y = 2_000_000;
const PART_2_MAX = 4_000_000;

const [answer1, answer2] = solve();
console.log('PART ONE: ' + answer1);
console.log('PART TWO: ' + answer2);

function solve() {
    const answers = [0, 0];
    const lines = inputFileToArray('input.txt', EOL);
    const data = lines.map(line => {
        const lineNumbers = line.match(/-?\d+/g).map(Number);
        const sensor = { x: lineNumbers[0], y: lineNumbers[1] };
        const beacon = { x: lineNumbers[2], y: lineNumbers[3] };
        const distance = dist(sensor, beacon);
        return { sensor, beacon, distance };
    });

    const { xMin, xMax } = data.reduce((acc, current) => {
        const { sensor, distance } = current;
        acc.xMin = Math.min(sensor.x - distance, acc.xMin);
        acc.xMax = Math.max(sensor.x + distance, acc.xMax);
        return acc;
    }, { xMin: 0, xMax: 0 });

    // Part 1:
    answers[0] = range(xMin, xMax).filter(x => {
        for (const entry of data) {
            if (x === entry.beacon.x && PART_1_Y === entry.beacon.y) return false;
            if (inArea(entry, { x, y: PART_1_Y })) return true;
        }
        return false;
    }).length;

    // Part 2:
    // there is only one point where distress beacon could be for generated input
    // so it should be the point next to some sensor area contour
    entries: for (const entry of data) {
        const { sensor, distance } = entry;

        for (let d = 0; d <= distance; d++) {
            const pointsToCheck = [
                { x: sensor.x + d, y: sensor.y - d + distance + 1 },
                { x: sensor.x + d, y: sensor.y + d - distance - 1 },
                { x: sensor.x - d, y: sensor.y - d + distance + 1 },
                { x: sensor.x - d, y: sensor.y + d - distance - 1 }
            ];

            const distressBeacon = pointsToCheck.find(p => {
                if (p.x < 0 || p.y < 0 || p.x > PART_2_MAX || p.y > PART_2_MAX) return false;
                return !data.some(e => inArea(e, p));
            });

            if (distressBeacon) {
                answers[1] = distressBeacon.x * PART_2_MAX + distressBeacon.y;
                break entries;
            }
        }
    }

    return answers;
}

function inArea(entry, point) {
    return dist(entry.sensor, point) <= entry.distance;
}