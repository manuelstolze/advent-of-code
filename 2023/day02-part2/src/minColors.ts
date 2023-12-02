export type ColorCount = {
    blue?: number,
    green?: number,
    red?: number
}

export function minColors(colorsArray: ColorCount[]): ColorCount {
    const result: ColorCount = {};

    for (const obj of colorsArray) {
        for (const color in obj) {
            if (obj.hasOwnProperty(color)) {
                result[color] = Math.min((result[color] !== undefined ? result[color] : Infinity), obj[color]);
            }
        }
    }

    console.log(result)

    return result;
}


