export type ColorCount = {
    blue?: number;
    green?: number;
    red?: number;
};

export function maxColors(colorsArray: ColorCount[]): ColorCount {
    const result: ColorCount = {};

    for (const obj of colorsArray) {
        for (const color in obj) {
            if (obj.hasOwnProperty(color)) {
                result[color] = Math.max((result[color] || 0), obj[color]);
            }
        }
    }

    return result;
}