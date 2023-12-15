export function memoize<TArgs extends unknown[], TResult>(fn: Function): Function {
  // Create a cache using a Map where the keys are stringified versions of the function arguments,
  // and the values are the results of the function for those arguments.
  const cache = new Map<string, TResult>();

  // Return a new function that will perform memoization.
  return (...args: TArgs) => {
    // Create a unique cache key by stringifying the function arguments.
    const cacheKey = JSON.stringify(args);

    // Check if the result for the given arguments is already in the cache.
    if (cache.has(cacheKey)) {
      // If yes, return the cached result.
      return cache.get(cacheKey);
    }

    // If not, call the original function with the provided arguments.
    const result = fn(...args);

    // Cache the result for future use.
    cache.set(cacheKey, result);

    // Return the result.
    return result;
  };
}
