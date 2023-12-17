import {readFileSync} from "node:fs";
import {sum} from "../util";

type Pattern = string[][];

type Point = { x: number, y: number }

type Direction = "N" | "W" | "S" | "E";

interface CycleResult {
    pattern: Pattern,
    rocks: Point[]
}

function readPattern(filePath: string): Pattern {
    return readFileSync(filePath, "utf-8").trim().replace(/\r/g, "").split("\n").map(n => n.split(""))
}

function part1(filePath: string) {
    const pattern = readPattern(filePath);
    const roundedRocks = findRoundedRocks(pattern);
    const {shiftedRocks} = shiftRocks(pattern, roundedRocks, "N");

    return getLoad(pattern.length, shiftedRocks);
}

function part2(filePath: string) {
    const extractedPattern = readPattern(filePath);
    const roundedRocks = findRoundedRocks(extractedPattern);

    const numberOfCycles = 1_000_000_000;

    let cycleResult: CycleResult = {pattern: extractedPattern, rocks: roundedRocks}

    const resultMap: Map<string, number> = new Map();

    while (true) {
        cycleResult = executeCycle(cycleResult);
        const resultAsString = JSON.stringify(cycleResult);

        if (!resultMap.has(resultAsString)) {
            resultMap.set(resultAsString, 1);
            continue;
        }

        if (resultMap.get(resultAsString) === 1) {
            resultMap.set(resultAsString, 2);
            continue;
        }

        break;
    }

    const repeatedResults: CycleResult[] = [];
    for (let [resultAsString, count] of resultMap) {
        if (count === 2) {
            repeatedResults.push(JSON.parse(resultAsString));
        }
    }

    const offset = resultMap.size - repeatedResults.length;

    const goalResultIndex =
        ((numberOfCycles - offset) % repeatedResults.length) - 1;
    const {pattern, rocks} = repeatedResults[goalResultIndex];

    return getLoad(pattern.length, rocks);
}

function executeCycle(cycle: CycleResult) {
    const {pattern, rocks} = cycle;
    let currentPattern: Pattern = pattern.map((row) => [...row]);
    let currentRocks: Point[] = rocks.map((r) => ({...r}));

    (['N', 'W', 'S', 'E'] as const).forEach((direction) => {
        const {pattern, shiftedRocks} = shiftRocks(
            currentPattern,
            sortRocks(currentRocks, direction),
            direction
        );
        currentPattern = pattern;
        currentRocks = shiftedRocks;
    });

    return {pattern: currentPattern, rocks: currentRocks};
}

function sortRocks(rocks: Point[], direction: Direction): Point[] {
    if (direction === 'N') return rocks.sort((a, b) => a.y - b.y);
    if (direction === 'S') return rocks.sort((a, b) => b.y - a.y);
    if (direction === 'W') return rocks.sort((a, b) => a.x - b.x);
    return rocks.sort((a, b) => b.x - a.x);
}

function findRoundedRocks(pattern: Pattern) {
    return reducePattern<Point[]>(pattern, (roundedRocks, symbol, rowIndex, colIndex) => {
        if (symbol === "O") roundedRocks.push({y: rowIndex, x: colIndex});
        return roundedRocks
    }, [])
}

function reducePattern<TAcc>(
    pattern: Pattern,
    callback: (acc: TAcc, symbol: string, rowIdx: number, colIdx: number) => TAcc,
    initialAcc: TAcc
) {
    let acc = initialAcc;
    for (let rowIdx = 0; rowIdx < pattern.length; rowIdx++) {
        for (let colIdx = 0; colIdx < pattern[rowIdx].length; colIdx++) {
            acc = callback(acc, pattern[rowIdx][colIdx], rowIdx, colIdx);
        }
    }
    return acc;
}

function shiftRocks(pattern: Pattern, roundedRocks: Point[], direction: Direction) {
    const shiftedRocks: Point[] = [];

    let currentPattern = pattern;

    for (let i = 0; i < roundedRocks.length; i++) {
        const {pattern: newPattern, shiftedRock} = slideRock(currentPattern, roundedRocks[i], direction);
        currentPattern = newPattern;

        shiftedRocks.push(shiftedRock);
    }

    return {pattern, shiftedRocks};
}

function slideRock(pattern: Pattern, rock: Point, direction: Direction) {
    const dimension = ["N", "S"].includes(direction) ? "y" : "x";

    const shiftedRock = {...rock};

    const nextCounter = (i: number) => {
        switch (direction) {
            case "N":
                return i - 1;
            case "W":
                return i - 1;
            default:
                return i + 1;
        }
    }

    const prevCounter = (i: number) => {
        switch (direction) {
            case "N":
                return i + 1;
            case "W":
                return i + 1;
            default:
                return i - 1;
        }
    }

    const getNextSymbol = (i: number) => {
        if (i === -1 || i > (dimension === "y" ? pattern.length - 1 : pattern[0].length - 1)) {
            return undefined;
        }

        return dimension === 'y' ? pattern[i][rock.x] : pattern[rock.y][i];
    }

    let i = nextCounter(rock[dimension]);

    while (true) {
        const nextSymbol = getNextSymbol(i);

        if (nextSymbol !== ".") {
            shiftedRock[dimension] = prevCounter(i);

            if (shiftedRock[dimension] !== rock[dimension]) {
                pattern[shiftedRock.y][shiftedRock.x] = "0";
                pattern[rock.y][rock.x] = ".";
            }

            return {pattern, shiftedRock}
        }
        i = nextCounter(i);
    }
}

function getLoad(patternLength: number, shiftedRocks: Point[]) {
    return sum(shiftedRocks.map((rock: Point) => patternLength - rock.y))
}


console.log(part1(`${__dirname}/src/example.txt`))
console.log(part1(`${__dirname}/src/input.txt`))

console.log(part2(`${__dirname}/src/example.txt`))
console.log(part2(`${__dirname}/src/input.txt`))