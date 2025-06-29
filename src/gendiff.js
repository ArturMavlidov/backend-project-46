import { Command } from "commander";

import { isObject } from "./helpers/index.js";
import { parser } from "./parser.js";
import { stylish } from "./formatter.js";

const getDiff = (json1, json2, depth = 1) => {
  const json1Entries = Object.entries(json1);
  const json2Keys = Object.keys(json2);

  const json2NewValuesData = json2Keys
    .filter((key) => !json1.hasOwnProperty(key))
    .reduce((acc, key) => {
      return [
        ...acc,
        {
          sign: "+ ",
          key,
          value: json2[key],
        },
      ];
    }, []);

  const data = json1Entries.reduce((acc, entry) => {
    const [key, value] = entry;

    const isInJson2 = json2.hasOwnProperty(key);
    const valueInJson2 = json2[key];
    const isValueObject = isObject(value);
    const isValueInJson2Object = isObject(valueInJson2);

    if (isValueObject && isValueInJson2Object) {
      return [
        ...acc,
        {
          key,
          sign: "  ",
          value: getDiff(value, valueInJson2, depth + 1),
        },
      ];
    }

    if (value === valueInJson2) {
      return [...acc, { sign: "  ", key, value }];
    }

    if (!isInJson2) {
      return [
        ...acc,
        {
          sign: "- ",
          key,
          value,
        },
      ];
    }

    if (value !== valueInJson2) {
      return [
        ...acc,
        {
          sign: "- ",
          key,
          value,
        },
        {
          sign: "+ ",
          key,
          value: valueInJson2,
        },
      ];
    }

    return acc;
  }, json2NewValuesData);

  const sortedData = data.sort((a, b) => a.key.localeCompare(b.key));

  return stylish(sortedData, depth);
};

export const compareFiles = (filepath1, filepath2, format) => {
  const json1 = parser(filepath1);
  const json2 = parser(filepath2);

  return getDiff(json1, json2, format);
};

export const gendiff = () => {
  const program = new Command();

  program
    .name("gendiff")
    .description("Compares two configuration files and shows a difference.")
    .arguments("filepath1 filepath2")
    .option("-V, --version", "output the version number")
    .option("-f, --format [type]", "output format", "stylish")
    .action(() => {
      const [filepath1, filepath2] = program.args;

      compareFiles(filepath1, filepath2, program.opts().format);
    });

  program.parse();
};

export default gendiff;
