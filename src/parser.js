import { readFileSync } from 'fs';
import jsToYaml from 'js-yaml';
import path from 'path';

export const parser = (filepath) => {
  const file = readFileSync(filepath, { encoding: 'utf8' });
  const fileExtension = path.extname(filepath);

  const isYaml = fileExtension === '.yml' || fileExtension === '.yaml';

  if (isYaml) {
    const convertedYamlToJson = jsToYaml.load(file);

    return convertedYamlToJson;
  }

  return JSON.parse(file);
};

export default parser;
