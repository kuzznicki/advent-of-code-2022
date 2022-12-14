import { EOL } from "os";
import { inputFileToArray, sum } from "./utils.js";

const SCREEN_SIZE = { W: 40, H: 6 };

const [answer1, answer2] = solve();
console.log('PART ONE: ' + answer1);
console.log('PART TWO: ' + answer2);

function solve() {
    const cyclesToCheck = [20, 60, 100, 140, 180, 220];
    const registerValueByCycle = {};
    const screen = new Array(SCREEN_SIZE.H).fill(0).map(() => new Array(SCREEN_SIZE.W));

    const instructions = inputFileToArray('input.txt', EOL).map(line => line.split(' '));
    let registerX = 1;
    let cycle = 1; 

    instructions.forEach(instruction => {
        const [cycles, xChange] = readInstruction(instruction);

        for (let i = 0; i < cycles; i++) {
            if (cyclesToCheck[0] === cycle) {
                registerValueByCycle[cycle] = registerX;
                cyclesToCheck.shift();
            }

            drawPixel(screen, registerX, cycle);
            cycle++;
        }

        registerX += xChange;
    });

    const signalStrength = sum(Object.entries(registerValueByCycle).map(([k, v]) => +k * v));
    screen.forEach(row => console.log(row.join('')));
    /*
    ###  #  #  ##  ####  ##    ## ###  ###  
    #  # # #  #  #    # #  #    # #  # #  # 
    #  # ##   #  #   #  #  #    # ###  #  # 
    ###  # #  ####  #   ####    # #  # ###  
    # #  # #  #  # #    #  # #  # #  # # #  
    #  # #  # #  # #### #  #  ##  ###  #  # 
    */
    return [signalStrength, 'RKAZAJBR'];
}

function readInstruction(instruction) {
    const [command, argument] = instruction;
    if (command === 'addx') return [2, +argument]; 
    return [1, 0];
}

function drawPixel(screen, registerX, cycle) {
    const row = Math.floor((cycle - 1) / SCREEN_SIZE.W);
    const col = (cycle - 1) % SCREEN_SIZE.W;
    screen[row][col] = Math.abs(col - registerX) <= 1 ? '#' : ' ';
}