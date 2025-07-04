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
  const iter = (coll) =>
    coll.reduce((acc, val) => {
      const { status, value, oldValue } = val;

      if (Array.isArray(value)) {
        return `${acc}${iter(value)}`;
      }

      if (status === "equals") return acc;

      const stringifiedValue = stringifyValue(value);
      const stringifiedOldValue = stringifyValue(oldValue);

      const mapping = {
        removed: "removed",
        added: `added with value: ${stringifiedValue}`,
        updated: `updated. From ${stringifiedOldValue} to ${stringifiedValue}`,
      };

      return `${acc}\nProperty '${val.property}' was ${mapping[status]}`;
    }, "");

  return iter(data).trim();
};

export default plain;
