import { isObject } from "../helpers/index.js";

const stringify = ({
  value,
  replacer = " ",
  spacesCount = 2,
  depth: initialDepth = 1,
}) => {
  const iter = (currentValue, depth) => {
    if (typeof currentValue !== "object" || currentValue === null) {
      return `${currentValue}`;
    }

    const indentSize = depth * spacesCount;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);
    const lines = Object.entries(currentValue).map(
      ([key, val]) => `${currentIndent}${key}: ${iter(val, depth + 1)}`
    );

    return ["{", ...lines, `${bracketIndent}}`].join("\n");
  };

  return iter(value, initialDepth);
};

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

    if (currentValue === "") {
      currentValue = " ";
    }

    const spaces = " ".repeat(depth * 4 - val.sign.length);

    return `${acc}\n${spaces}${val.sign}${val.key}:${
      val.value === "" ? "" : " "
    }${currentValue}`;
  }, "");

  return `{${result}\n${" ".repeat((depth - 1) * 4)}}`;
};

export default stylish;
