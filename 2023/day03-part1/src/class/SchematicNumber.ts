import {Point} from "./index";
import {range} from "radash";

export class SchematicNumber {
    constructor(
        private readonly xStart: number,
        private readonly xEnd: number,
        private readonly y: number,
        public readonly value: number,
    ) {}

    boundingBox(xMax: number, yMax: number): Array<Point> {
        return [
            // Top
            ...[...range(this.xStart - 1, this.xEnd + 1)].map(x => {
                return { x, y: this.y - 1 }
            }),

            // Right
            { x: this.xEnd + 1, y: this.y },

            // Bottom
            ...[...range(this.xStart - 1, this.xEnd + 1)].map(x => {
                return { x, y: this.y + 1 }
            }),

            // Left
            { x: this.xStart - 1, y: this.y },
        ].filter(point => point.x >= 0 && point.x <= xMax && point.y >= 0 && point.y <= yMax)
    }

    overlaps(point: Point): boolean {
        return this.y === point.y && point.x >= this.xStart && point.x <= this.xEnd
    }
}