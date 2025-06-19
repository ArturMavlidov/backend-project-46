import { Command } from "commander";

import { parser } from "./parser.js";

export const gendiff = () => {
  const program = new Command();

  program
    .name("gendiff")
    .description("Compares two configuration files and shows a difference.")
    .arguments("filepath1 filepath2")
    .option("-V, --version", "output the version number")
    .option("-f, --format [type]", "output format")
    .action(() => {
      const [filepath1, filepath2] = program.args;

      const json1 = parser(filepath1);
      const json2 = parser(filepath2);

      const json1Keys = Object.keys(json1);
      const json1Entries = Object.entries(json1);
      const json2Keys = Object.keys(json2);

      const json2NewKeys = json2Keys.filter((key) => !json1Keys.includes(key));

      const json2NewKeysData = json2NewKeys.reduce((acc, key) => {
        return [...acc, { key, value: json2[key], sign: "+" }];
      }, []);

      const data = json1Entries.reduce((acc, entry) => {
        const [key, value] = entry;

        let sign;

        const isKeyInJson2 = json2Keys.includes(key);
        const isSameValues = json2[key] === value;

        if (!isKeyInJson2) {
          return [...acc, { sign: "-", key, value }];
        }

        if (isKeyInJson2 && isSameValues) {
          sign = "";

          return [...acc, { sign, key, value }];
        }

        if (isKeyInJson2 && !isSameValues) {
          sign = "-";

          return [
            ...acc,
            { sign, key, value },
            { sign: "+", key, value: json2[key] },
          ];
        }
      }, json2NewKeysData);

      const sortedData = [...data].sort((a, b) => a.key.localeCompare(b.key));

      const result = sortedData.reduce((acc, item) => {
        return acc + `\n  ${item.sign || " "} ${item.key}: ${item.value}`;
      }, "");

      console.log(`{${result}\n}`);
    });

  program.parse();
};
