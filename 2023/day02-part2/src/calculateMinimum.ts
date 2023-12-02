export type ColorCount = {
    blue?: number;
    green?: number;
    red?: number;
};

export function calculateMinimum(game: ColorCount[]): { [key: string]: number } {
    const minCounts: { [key: string]: number } = {};

    for (const round of game) {
        for (const color in round) {
            if (round.hasOwnProperty(color)) {
                minCounts[color] = Math.max(minCounts[color] || 0, round[color] || 0);
            }
        }
    }

    return minCounts;
}