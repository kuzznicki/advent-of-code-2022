import { EOL } from "os";
import { inputFileToArray, unique, sum } from "./utils.js";

const [answer1, answer2] = solve();
console.log('PART ONE: ' + answer1);
console.log('PART TWO: ' + answer2);

function solve() {
    const rucksacks = inputFileToArray('input.txt', EOL);
    
    // Part one:
    const sharedItems = rucksacks.map(rucksack => {
        const firstHalf = rucksack.slice(0, rucksack.length / 2).split('');
        const secondHalf = rucksack.slice(rucksack.length / 2).split('');

        const firstHalfMap = {};
        firstHalf.forEach(item => (firstHalfMap[item] = true));

        const shared = secondHalf.filter(item => firstHalfMap[item]);
        return unique(shared);
    });

    const sharedItemPriorities = sharedItems.flat().map(e => getItemPriority(e));


    // Part two:
    const badges = [];
    
    for (let i = 0; i < rucksacks.length; i += 3) {
        const groupRucksacks = rucksacks.slice(i, i + 3);
        const itemsMap = {};
        
        for (const rucksack of groupRucksacks) {
            const itemsInRucksack = unique(rucksack.split(''));
            itemsInRucksack.forEach(e => (itemsMap[e] = (itemsMap[e] || 0) + 1));
        }

        const badge = Object.entries(itemsMap).find(([k, v]) => v === 3)[0];
        badges.push(badge);
    }

    const badgePriorities = badges.map(e => getItemPriority(e));

    return [sum(sharedItemPriorities), sum(badgePriorities)];
}

function getItemPriority(item) {
    return item.toLowerCase() === item
        ? (item.charCodeAt(0) - 'a'.charCodeAt(0) + 1)
        : (item.charCodeAt(0) - 'A'.charCodeAt(0) + 27);
}