import {ColorCount, minColors} from "./minColors";

describe('minColors', () => {
    it('should calculate the minimum counts for each color', () => {
        const colorsArray: ColorCount[] = [
            { blue: 3, red: 4 },
            { red: 1, green: 2, blue: 6 },
            { green: 2 },
        ];

        const result = minColors(colorsArray);

        expect(result).toEqual({ blue: 3, red: 1, green: 2 });
    });

    it('should handle empty colorsArray', () => {
        const colorsArray: ColorCount[] = [];
        const result = minColors(colorsArray);

        expect(result).toEqual({});
    });

    it('should handle objects with missing colors', () => {
        const colorsArray: ColorCount[] = [
            { blue: 3, red: 4 },
            { green: 2 },
        ];

        const result = minColors(colorsArray);

        expect(result).toEqual({ blue: 3, red: 4, green: 2 });
    });
});