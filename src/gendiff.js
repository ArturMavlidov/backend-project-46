import { Command } from 'commander';

import { isObject } from './helpers/index.js';
import { parser } from './parser.js';
import { formatter } from './formatters/index.js';

const getDiff = ({
  json1, json2, format, propertyTree = '', depth = 1,
}) => {
  const json1Entries = Object.entries(json1);
  const json2Keys = Object.keys(json2);

  const json2NewValuesData = json2Keys
    .filter((key) => !Object.hasOwn(json1, key))
    .reduce(
      (acc, key) => [
        ...acc,
        {
          sign: '+ ',
          operation: 'added',
          property: propertyTree ? `${propertyTree}.${key}` : key,
          key,
          value: json2[key],
        },
      ],
      [],
    );

  const data = json1Entries.reduce((acc, entry) => {
    const [key, value] = entry;

    const isInJson2 = Object.hasOwn(json2, key);
    const valueInJson2 = json2[key];
    const isValueObject = isObject(value);
    const isValueInJson2Object = isObject(valueInJson2);

    const property = propertyTree ? `${propertyTree}.${key}` : key;

    if (isValueObject && isValueInJson2Object) {
      return [
        ...acc,
        {
          key,
          property,
          sign: '  ',
          value: getDiff({
            json1: value,
            json2: valueInJson2,
            propertyTree: property,
            depth: depth + 1,
            format,
          }),
        },
      ];
    }

    if (value === valueInJson2) {
      return [
        ...acc,
        {
          sign: '  ',
          property,
          key,
          value,
          ignoreInPlain: true,
        },
      ];
    }

    if (!isInJson2) {
      return [
        ...acc,
        {
          sign: '- ',
          operation: 'removed',
          property,
          key,
          value,
        },
      ];
    }

    if (value !== valueInJson2) {
      return [
        ...acc,
        {
          sign: '- ',
          property,
          key,
          value,
          ignoreInPlain: true,
        },
        {
          sign: '+ ',
          operation: 'updated',
          oldValue: value,
          value: valueInJson2,
          property,
          key,
        },
      ];
    }

    return acc;
  }, json2NewValuesData);

  const sortedData = data.sort((a, b) => a.key.localeCompare(b.key));

  return sortedData;
};

export const compareFiles = (filepath1, filepath2, format = 'stylish') => {
  const json1 = parser(filepath1);
  const json2 = parser(filepath2);

  const diff = getDiff({ json1, json2, format });
  return formatter({ data: diff, format });
};

export const gendiff = () => {
  const program = new Command();

  program
    .name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .arguments('filepath1 filepath2')
    .option('-V, --version', 'output the version number')
    .option('-f, --format [type]', 'output format', 'stylish')
    .action(() => {
      const [filepath1, filepath2] = program.args;

      console.log(compareFiles(filepath1, filepath2, program.opts().format));
    });

  program.parse();
};

export default gendiff;
