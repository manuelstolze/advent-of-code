import {describe, expect} from '@jest/globals';
import getNumberOfColor from "./getNumberOfColor";



describe('getNumberOfColor', () => {
  it('should return an object with counts for each color', () => {
    const input = ['4 green', '10 blue', '6 red'];
    const result = getNumberOfColor(input);

    expect(result).toEqual({ green: 4, blue: 10, red: 6 });
  });

  it('should handle invalid input gracefully', () => {
    const input = ['4 green', 'invalid', '6 red'];
    const result = getNumberOfColor(input);

    expect(result).toEqual({ green: 4, red: 6 });
  });

  it('should handle empty input array', () => {
    const input: string[] = [];
    const result = getNumberOfColor(input);

    expect(result).toEqual({});
  });
});