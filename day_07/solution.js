import { EOL } from "os";
import { inputFileToArray, sum, traverse } from "../utils.js";

const DISK_SPACE = 70000000;
const NEEDED_SPACE = 30000000;

class Directory {
    constructor(name, parent) {
        this.size = 0;
        this.name = name;
        this.parent = parent;
        this.directories = {};
        this.files = {};
    }

    addDirectory(dirName) {
        if (this.directories[dirName]) return;
        this.directories[dirName] = new Directory(dirName, this);
        this.calcSize();
    }

    addFile(filename, size) {
        this.files[filename] = { filename, size };
        this.calcSize();
    }

    calcSize() {
        const { files, directories } = this;

        const size = [...Object.values(files), ...Object.values(directories)]
            .reduce((acc, e) => acc + e.size, 0);

        if (size === this.size) return;
        this.size = size;
        if (this.parent) this.parent.calcSize();
    }
}

const [answer1, answer2] = solve();
console.log('PART ONE: ' + answer1);
console.log('PART TWO: ' + answer2);

function solve() {
    const rootDir = new Directory('/', null);
    let currentDir = rootDir;

    const lines = inputFileToArray('input.txt', EOL);
    for (const line of lines) {
        const parts = line.split(' ');

        if (parts[0] === '$') {
            const [, cmd, arg] = parts;
            if (cmd !== 'cd') continue;
            switch (arg) {
                case '/': currentDir = rootDir; break;
                case '..': currentDir = currentDir.parent || currentDir; break;
                default: currentDir = currentDir.directories[arg] || currentDir;
            }
        } else if (parts[0] === 'dir') {
            currentDir.addDirectory(parts[1]);
        
        } else if (!isNaN(parts[0])) {
            const [size, filename] = parts;
            currentDir.addFile(filename, +size);
        } 
    }

    const dirs = [];
    traverse(rootDir, dir => Object.values(dir.directories), dir => dirs.push(dir));
    dirs.sort((a, b) => a.size - b.size);

    const spaceToFreeUp = NEEDED_SPACE - (DISK_SPACE - rootDir.size);
    const dirsUpTo100k = dirs.filter(dir => dir.size <= 100_000);
    const dirToDelete = dirs.find(dir => dir.size >= spaceToFreeUp);

    return [sum(dirsUpTo100k.map(dir => dir.size)), dirToDelete.size];
}
