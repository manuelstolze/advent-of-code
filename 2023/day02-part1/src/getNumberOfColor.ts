export default function getNumberOfColor(input: string[]): { [color: string]: number } {
    const result: { [color: string]: number } = {};

    for (const item of input) {
        const [countString, color] = item.split(' ');
        const count = parseInt(countString, 10);

        if (!isNaN(count)) {
            result[color] = count;
        }
    }

    return result;
}
