import { EOL } from "os";
import { inputFileToArray, inputToArray } from "./utils.js";

console.log('PART ONE: ' + solve(20, true));
console.log('PART TWO: ' + solve(10000)); 

function solve(rounds, divideWorryLevel) {
    const monkeyStrings = inputFileToArray('input.txt', EOL + EOL);
    const monkeys = monkeyStrings.map(str => stringToMonkey(str));
    const divByModulo = monkeys.reduce((acc, monkey) => acc * monkey.divBy, 1);
    const inspectionsByMonkey = {};
    
    for (let i = 1; i <= rounds; i++) {
        monkeys.forEach((monkey, monkeyIdx) => {
            while (monkey.items.length) {
                const item = monkey.items.shift();
                const currentWorryLevel = divideWorryLevel
                    ? Math.floor(monkey.inspect(item) / 3) % divByModulo
                    : monkey.inspect(item) % divByModulo;

                inspectionsByMonkey[monkeyIdx] = (inspectionsByMonkey[monkeyIdx] || 0 ) + 1;
                const to = monkey.throwTo(currentWorryLevel);
                monkeys[to].items.push(currentWorryLevel);
            }
        });
    }

    const monkeyBusiness = Object.values(inspectionsByMonkey).sort((a,b) => b - a);
    return monkeyBusiness[0] * monkeyBusiness[1];
}

function stringToMonkey(str) {
    const lines = inputToArray(str, EOL);

    const items = getNumbersFromString(lines[1]).map(e => e);

    const operationString = lines[2].split('=')[1];
    const [operator, val] = operationString.split(' ').slice(-2); 
    const inspect = operator === '*' // operator could be only * or +
        ? old => old * (val === 'old' ? old: +val) 
        : old => old + (val === 'old' ? old: +val);

    const divisableBy = getNumbersFromString(lines[3])[0];
    const monkeyIfTrue = getNumbersFromString(lines[4])[0];
    const monkeyIfFalse = getNumbersFromString(lines[5])[0];
    const throwTo = v => (v % divisableBy) == 0 ? monkeyIfTrue : monkeyIfFalse;

    return { items, inspect, throwTo, divBy: divisableBy };
}

function getNumbersFromString(str) {
    return str.match(/[0-9]+/g).map(Number);
}