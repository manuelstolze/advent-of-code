import input from "./input";
import getNumberOfColor from "./getNumberOfColor";
import {calculateMinimum} from "./calculateMinimum";

const games = input.split(/\n/g).map((line) => {
    const [gameCounter, gameResult] =line.split(":")
    const counter = gameCounter.replace("Game ", "");

    const results = gameResult.trim().split("; ")

    const resultSets = results.map((resultSet) => {
        const gameRounds = resultSet.split(", ")
        return getNumberOfColor(gameRounds)
    })

    return {counter: counter, results: resultSets, min: calculateMinimum(resultSets)}
});


const powers = games.map((game) => {
   return game.min.red * game.min.green * game.min.blue
})


console.log(powers.reduce((prev, curr) => {
    return prev + curr
}, 0))