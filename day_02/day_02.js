import { EOL } from "os";
import { inputFileToArray } from "../utils.js";

const [answer1, answer2] = solve();
console.log('PART ONE: ' + answer1);
console.log('PART TWO: ' + answer2);

function solve() {
    const rounds = inputFileToArray('input.txt', EOL);

    const pointsByShape = { rock: 1, paper: 2, scissors: 3 };
    const shapeByLetter = { A: 'rock', X: 'rock', B: 'paper', Y: 'paper', C: 'scissors', Z: 'scissors' };
    const resultByLetter = { X: 'lose', Y: 'draw', Z: 'win' };
    const allShapes = Object.keys(pointsByShape);
    
    let pointsPartOne = 0;
    let pointsPartTwo = 0;

    for (const round of rounds) {
        // Part one:
        const [opponentLetter, myLetter] = round.split(' ');
        const opponentShape = shapeByLetter[opponentLetter];
        const myShape = shapeByLetter[myLetter];
        const shapeToWin = getShapeToWinWith(opponentShape);

        if (myShape === opponentShape) {
            pointsPartOne += pointsByShape[myShape] + 3; 
        } else if (myShape === shapeToWin) {
            pointsPartOne += pointsByShape[myShape] + 6; 
        } else {
            pointsPartOne += pointsByShape[myShape];
        }
            
        // Part two:
        const result = resultByLetter[myLetter];
        if (result === 'draw') {
            pointsPartTwo += pointsByShape[opponentShape] + 3; 
        } else if (result === 'win') {
            pointsPartTwo += pointsByShape[shapeToWin] + 6; 
        } else if (result === 'lose') {
            const shapeToLose = allShapes.find(s => s !== opponentShape && s !== shapeToWin);
            pointsPartTwo += pointsByShape[shapeToLose]; 
        }
    }

    return [pointsPartOne, pointsPartTwo]
}

function getShapeToWinWith(shape) {
    if (shape === 'rock') return 'paper';
    if (shape === 'paper') return 'scissors';
    return 'rock';
};
