import inputFile from "./input";
import {Schematic, SchematicGear, SchematicNumber} from "./class";

const parseSchematic = (): Schematic => {
    const data = inputFile.split('\n')

    const gears = data
        .map((line, index): Array<SchematicGear> => {
            return [...line.matchAll(/(\*)/g)].map((match): SchematicGear => {
                if (match.index === undefined) {
                    throw new Error('WTF')
                }

                return new SchematicGear(match.index, index)
            })
        })
        .flat()

    const numbers = data
        .map((line, index): Array<SchematicNumber> => {
            return [...line.matchAll(/(\d+)/g)].map((match): SchematicNumber => {
                if (match.index === undefined) {
                    throw new Error('WTF')
                }

                return new SchematicNumber(match.index, match.index + match[1].length - 1, index, Number(match[1]))
            })
        })
        .flat()

    return new Schematic(
        data.map(line => line.split('')),
        gears,
        numbers,
    )
}

const answer = parseSchematic().validPartNumbers.reduce((acc, number) => acc + number, 0)

console.log(answer)