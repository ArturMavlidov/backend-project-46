import { compareFiles } from '../src/gendiff';
import { getFixturePath } from '../src/helpers';

test('gendiff', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');

  expect(compareFiles(file1, file2)).toBe(`{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`);
});
