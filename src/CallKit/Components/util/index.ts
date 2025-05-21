/* eslint-disable no-useless-concat */
const MAX_MEMOIZE_SIZE = 500;

function memoize(func, resolver) {
  // eslint-disable-next-line eqeqeq
  if (typeof func !== 'function' || (resolver != null && typeof resolver !== 'function')) {
    throw new TypeError('Expected a function');
  }
  const memoized = (...args) => {
    const key = resolver ? resolver.apply(this, args) : args[0];
    const { cache } = memoized;

    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize.Cache || Map)();
  return memoized;
}

memoize.Cache = Map;

function memoizeCapped(func) {
  const result = memoize(func, (key) => {
    const { cache } = result;
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }
    return key;
  });

  return result;
}

const charCodeOfDot = '.'.charCodeAt(0);
const reEscapeChar = /\\(\\)?/g;
const rePropName = RegExp(
  // Match anything that isn't a dot or bracket.
  '[^.[\\]]+' + '|'
  // Or match property names within brackets.
  + '\\[(?:'
    // Match a non-string expression.
    + '([^"\'][^[]*)' + '|'
    // Or match strings (supports escaping characters).
    + '(["\'])((?:(?!\\2)[^\\\\]|\\\\.)*?)\\2'
  + ')\\]' + '|'
  // Or match "" as the space between consecutive dots or empty brackets.
  + '(?=(?:\\.|\\[\\])(?:\\.|\\[\\]|$))',
  'g',
);

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
export const stringToPath = memoizeCapped((string) => {
  const result = [];
  if (string.charCodeAt(0) === charCodeOfDot) {
    result.push('');
  }
  string.replace(rePropName, (match, expression, quote, subString) => {
    let key = match;
    if (quote) {
      key = subString.replace(reEscapeChar, '$1');
    } else if (expression) {
      key = expression.trim();
    }
    result.push(key);
  });
  return result;
});

export function isEmpty(obj) {
  if (obj === null || obj === undefined) {
    return true;
  }

  if (typeof obj === 'string' && obj.trim().length === 0) {
    return true;
  }

  if (Array.isArray(obj) || typeof obj === 'object') {
    return Object.keys(obj).length === 0;
  }

  return false;
}

export function findValues(obj, condition, path, results, formatResults) {
  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    const currentPath = isEmpty(path) ? key : `${path}.${key}`;
    if (typeof value === 'object') {
      if (Array.isArray(value)) {
        for (let i = 0; i < value.length; i++) {
          const itemPath = `${currentPath}[${i}]`;
          findValues(value[i], condition, itemPath, results, formatResults);
        }
      } else {
        findValues(value, condition, currentPath, results, formatResults);
      }
    } else if (condition(value)) {
      const result = typeof formatResults === 'function' ? formatResults({ key: value, value: currentPath }) : currentPath;
      results.push(result);
    }
  });
}

export function deepClone(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  const clone = Array.isArray(obj) ? [] : {};

  Object.keys(obj).forEach((key) => {
    clone[key] = deepClone(obj[key]);
  });

  return clone;
}

export function clearPropsValues(obj, value) {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }
  if (value in obj) {
    const newObj = deepClone(obj);
    delete newObj[value];
    return newObj;
  }
}
