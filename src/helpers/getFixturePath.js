import path from 'path';
import { fileURLToPath } from 'url';

export const getFixturePath = (filename) => path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  '../..',
  '__fixtures__',
  filename,
);

export default getFixturePath;
