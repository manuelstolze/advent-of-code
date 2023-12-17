import {readFileSync} from "node:fs";
import {Pattern} from "./src/Pattern";
import * as util from "util";


type PatternArray = string[][];

function readPatterns(filePath: string) {
    return readFileSync(filePath, "utf-8").trim().replace(/\r/g, "").split("\n").reduce<PatternArray[]>(
        (patterns, line) => {
            if (line.trim() === '') {
                patterns.push([]);
            } else {
                patterns[patterns.length - 1].push(line.split(''));
            }
            return patterns;
        },
        [[]]
    ).map(pattern => new Pattern(pattern));
}

function sumReflectionLines(
    reflectionLines: {
        index: number;
        isVertical: boolean;
    }[]
) {
    return reflectionLines.reduce(
        (acc, {index, isVertical}) =>
            acc + (isVertical ? index + 1 : (index + 1) * 100),
        0
    );
}


function part1(filepath: string) {
    const patterns = readPatterns(filepath);
    return sumReflectionLines(
        patterns.map((pattern) => pattern.getReflectionLine(0))
    );
}

function part2(filepath: string) {
    const patterns = readPatterns(filepath);
    return sumReflectionLines(
        patterns.map((pattern) => pattern.getReflectionLine(1))
    );
}

console.dir(part1(`${__dirname}/src/example.txt`))
console.dir(part1(`${__dirname}/src/input.txt`))
console.dir(part2(`${__dirname}/src/example.txt`))
console.dir(part2(`${__dirname}/src/input.txt`))
