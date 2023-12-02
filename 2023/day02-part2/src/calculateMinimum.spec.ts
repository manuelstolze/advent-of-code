import {calculateMinimum} from "./calculateMinimum";
import {ColorCount} from "./minColors";

describe('calculateMinimum', () => {
    it('should calculate the minimum counts for each color', () => {
        const game: ColorCount[] = [
            { blue: 3, red: 4 },
            { red: 1, green: 2, blue: 6 },
            { green: 2 },
        ];

        const result = calculateMinimum(game);

        expect(result).toEqual({ blue: 6, red: 4, green: 2 });
    });

    it('should handle empty game array', () => {
        const game: ColorCount[] = [];
        const result = calculateMinimum(game);

        expect(result).toEqual({});
    });

    it('should handle game rounds with missing colors', () => {
        const game: ColorCount[] = [
            { blue: 3, red: 4 },
            { green: 2 },
        ];

        const result = calculateMinimum(game);

        expect(result).toEqual({ blue: 3, red: 4, green: 2 });
    });
});