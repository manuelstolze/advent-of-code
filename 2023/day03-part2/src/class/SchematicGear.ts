import {SchematicNumber} from "./SchematicNumber";
import {range} from "radash";
import {Point} from "./index";


export class SchematicGear implements Point {
    public adjacentNumbers: Array<SchematicNumber> = []

    constructor(
        public readonly x: number,
        public readonly y: number,
    ) {}

    boundingBox(xMax: number, yMax: number): Array<Point> {
        return [
            // Top
            ...[...range(this.x - 1, this.x + 1)].map(x => {
                return { x, y: this.y - 1 }
            }),

            // Right
            { x: this.x + 1, y: this.y },

            // Bottom
            ...[...range(this.x - 1, this.x + 1)].map(x => {
                return { x, y: this.y + 1 }
            }),

            // Left
            { x: this.x - 1, y: this.y },
        ].filter(point => point.x >= 0 && point.x <= xMax && point.y >= 0 && point.y <= yMax)
    }

    get ratio(): number {
        return this.adjacentNumbers.reduce((acc, number) => acc * number.value, 1)
    }
}