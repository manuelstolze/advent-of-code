import {SchematicGear} from "./SchematicGear";
import {SchematicNumber} from "./SchematicNumber";

export class Schematic {
    constructor(
        private readonly data: Array<Array<number | string>>,
        private readonly gears: Array<SchematicGear>,
        private readonly numbers: Array<SchematicNumber>,
    ) {}

    get validGears(): Array<SchematicGear> {
        return this.gears.filter(gear => {
            const adjacentNumbers = [
                ...new Set(
                    gear
                        .boundingBox(this.xMax, this.yMax)
                        .map(point => {
                            return this.numbers.find(number => number.overlaps(point))
                        })
                        .filter(value => value !== undefined),
                ),
            ] as Array<SchematicNumber>

            if (adjacentNumbers.length !== 2) {
                return false
            }

            gear.adjacentNumbers = adjacentNumbers

            return true
        })
    }

    get xMax(): number {
        return this.data[0].length - 1
    }

    get yMax(): number {
        return this.data.length - 1
    }
}