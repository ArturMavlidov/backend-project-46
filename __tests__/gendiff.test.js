import { compareFiles } from '../src/gendiff';
import { getFixtureContent, getFixturePath } from '../src/helpers';

describe('gendiff', () => {
  test('gendiff json files', () => {
    const result = getFixtureContent('file1_file2_result.txt');

    const file1 = getFixturePath('file1.json');
    const file2 = getFixturePath('file2.json');

    expect(compareFiles(file1, file2)).toBe(result);
  });

  test('gendiff yml files', () => {
    const result = getFixtureContent('file1_file2_result.txt');

    const file1 = getFixturePath('file1.yml');
    const file2 = getFixturePath('file2.yaml');

    expect(compareFiles(file1, file2)).toBe(result);
  });

  test('gendiff nested json files', () => {
    const result = getFixtureContent('file3_file4_result.txt');

    const file1 = getFixturePath('file3.json');
    const file2 = getFixturePath('file4.json');

    expect(compareFiles(file1, file2)).toBe(result);
  });

  test('gendiff nested yml files', () => {
    const result = getFixtureContent('file3_file4_result.txt');

    const file1 = getFixturePath('file3.yml');
    const file2 = getFixturePath('file4.yaml');

    expect(compareFiles(file1, file2)).toBe(result);
  });

  test('plain gendiff nested json files', () => {
    const result = getFixtureContent('file3_file4_plain_result.txt');

    const file1 = getFixturePath('file3.json');
    const file2 = getFixturePath('file4.json');

    expect(compareFiles(file1, file2, 'plain')).toBe(result);
  });
});
