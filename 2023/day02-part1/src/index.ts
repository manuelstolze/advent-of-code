import input from "./input";
import getNumberOfColor from "./getNumberOfColor";
import {maxColors} from "./maxColors";


const lines = input.split(/\n/g).map((line) => {
    let [gameCounter, gameResult] =line.split(":")

    const counter = gameCounter.replace("Game ", "");
    let results = gameResult.trim().split("; ")

    const resultSets = results.map((resultSet) => {
        const gameRounds = resultSet.split(", ")
        return getNumberOfColor(gameRounds)
    })

    return {counter: counter, results: resultSets, max: maxColors(resultSets)}
});

const filteredLines = lines.filter((line) => {
    return line.max.blue <= 14 && line.max.green <= 13 && line.max.red <= 12
})

const answer = filteredLines
    .map((line) => {
        return Number(line.counter)
    })
    .reduce((prev, curr) => {
        return prev + curr
    }, 0);


console.log(answer);