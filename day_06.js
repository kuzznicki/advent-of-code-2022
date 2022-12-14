import { inputFileToArray, unique } from "./utils.js";

const PACKET_START_LEN = 4;
const MSG_START_LEN = 14;

const [answer1, answer2] = solve();
console.log('PART ONE: ' + answer1);
console.log('PART TWO: ' + answer2);

function solve() {
    const chars = inputFileToArray('input.txt', '');
    let packetPos = 0;
    let msgPos = 0;

    const isValidMarkerStart = arr => unique(arr).length === arr.length;

    for (let i = 0; i < chars.length; i++) {
        if (!packetPos && isValidMarkerStart(chars.slice(i, i + PACKET_START_LEN))) {
            packetPos = i + PACKET_START_LEN;
        }
        
        if (!msgPos && isValidMarkerStart(chars.slice(i, i + MSG_START_LEN))) {
            msgPos = i + MSG_START_LEN;
        }

        if (packetPos && msgPos) break;
    }

    return [packetPos, msgPos];
}
