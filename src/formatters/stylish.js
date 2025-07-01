import { stringify, isObject } from '../helpers/index.js';

export const stylish = (data, depth = 1) => {
  const result = data.reduce((acc, val) => {
    let currentValue = val.value;

    if (Array.isArray(val.value)) {
      currentValue = stylish(val.value, depth + 1);
    }

    if (isObject(val.value)) {
      currentValue = stringify({
        value: val.value,
        spacesCount: 4,
        depth: depth + 1,
      });
    }

    const spaces = ' '.repeat(depth * 4 - val.sign.length);

    return `${acc}\n${spaces}${val.sign}${val.key}:${
      val.value === '' ? '' : ' '
    }${currentValue}`;
  }, '');

  return `{${result}\n${' '.repeat((depth - 1) * 4)}}`;
};

export default stylish;
