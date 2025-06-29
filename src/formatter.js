import { stringify, isObject } from "./helpers/index.js";

export const stylish = (data, depth) => {
  const result = data.reduce((acc, val) => {
    const stringifiedValue = isObject(val.value)
      ? stringify({
          value: val.value,
          spacesCount: 4,
          depth: depth + 1,
        })
      : val.value;

    const spaces = " ".repeat(depth * 4 - val.sign.length);

    return `${acc}\n${spaces}${val.sign}${val.key}:${
      val.value === "" ? "" : " "
    }${stringifiedValue}`;
  }, "");

  return `{${result}\n${" ".repeat((depth - 1) * 4)}}`;
};

export default stylish;
