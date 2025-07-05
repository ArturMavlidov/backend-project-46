import path from 'path';
import { readFileSync } from 'fs';
import { getDiff } from './getDiff.js';
import { parser } from './parser.js';
import { formatter } from './formatters/index.js';

export const compareFiles = (filepath1, filepath2, format = 'stylish') => {
  const file1 = readFileSync(filepath1, { encoding: 'utf8' });
  const file2 = readFileSync(filepath2, { encoding: 'utf8' });

  const object1 = parser(file1, path.extname(filepath1));
  const object2 = parser(file2, path.extname(filepath2));

  const diff = getDiff({ object1, object2, format });
  return formatter({ data: diff, format });
};

export default compareFiles;
