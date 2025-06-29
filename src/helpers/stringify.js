export const stringify = ({
  value,
  replacer = " ",
  spacesCount = 2,
  depth = 1,
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

  return iter(value, depth);
};

export default stringify;
