import { readFileSync } from 'fs';

export const parser = (filepath) => {
  const file = readFileSync(filepath, { encoding: 'utf8' });

  return JSON.parse(file);
};

export default parser;
