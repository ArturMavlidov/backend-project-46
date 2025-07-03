import { isObject } from "../helpers/index.js";

const stringifyValue = (value) => {
  if (isObject(value)) {
    return "[complex value]";
  }

  if (typeof value !== "string") {
    return value;
  }

  return `'${value}'`;
};

export const plain = (data) => {
  const iter = (data) => {
    return data.reduce((acc, val) => {
      const { operation, value, oldValue, ignoreInPlain } = val;

      if (ignoreInPlain) {
        return acc;
      }

      if (Array.isArray(value)) {
        return `${acc}${iter(value)}`;
      }

      const stringifiedValue = stringifyValue(value);
      const stringifiedOldValue = stringifyValue(oldValue);

      let result;

      switch (operation) {
        case "removed":
          result = "removed";
          break;
        case "added":
          result = `added with value: ${stringifiedValue}`;
          break;
        case "updated":
          result = `updated. From ${stringifiedOldValue} to ${stringifiedValue}`;
          break;
        default:
          console.error(`Unknown operation: ${operation}`);
          break;
      }

      return `${acc}\nProperty '${val.property}' was ${result}`;
    }, "");
  };

  return iter(data).trim();
};
export default plain;
