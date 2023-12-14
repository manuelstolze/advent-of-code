const intersection = <T>(array1: ReadonlyArray<T>, array2: ReadonlyArray<T>): ReadonlyArray<T> => {
  return array1.filter((value) => {
    return array2.includes(value);
  });
};

function* cycle<T>(array: ReadonlyArray<T>): Generator<T, void, undefined> {
  while (true) {
    yield* array;
  }
}

function sum(arr: number[]): number {
  return arr.reduce((a, b) => a + b, 0);
}

export { intersection, cycle, sum };
