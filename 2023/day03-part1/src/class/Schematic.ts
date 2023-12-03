import {SchematicGear} from "./SchematicGear";
import {SchematicNumber} from "./SchematicNumber";
import {isNumeric} from "../../util";

export class Schematic {
    constructor(
        private readonly data: Array<Array<number | string>>,
        private readonly gears: Array<SchematicGear>,
        private readonly numbers: Array<SchematicNumber>,
    ) {}

    get validPartNumbers(): Array<number> {
        return this.numbers
            .filter(number => {
                return number.boundingBox(this.xMax, this.yMax).some(point => {
                    return this.data[point.y][point.x] !== '.' && !isNumeric(this.data[point.y][point.x])
                })
            })
            .map(number => number.value)
    }

    get xMax(): number {
        return this.data[0].length - 1
    }

    get yMax(): number {
        return this.data.length - 1
    }
}