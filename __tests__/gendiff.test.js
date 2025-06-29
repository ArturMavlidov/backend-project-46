import { compareFiles } from "../src/gendiff";
import { getFixturePath } from "../src/helpers";

describe("gendiff", () => {
  const resultString = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

  test("gendiff json files", () => {
    const file1 = getFixturePath("file1.json");
    const file2 = getFixturePath("file2.json");

    expect(compareFiles(file1, file2)).toBe(resultString);
  });

  test("gendiff yml files", () => {
    const file1 = getFixturePath("file1.yml");
    const file2 = getFixturePath("file2.yaml");

    expect(compareFiles(file1, file2)).toBe(resultString);
  });

  test("gendiff nested json files", () => {
    const result = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow:
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;

    const file1 = getFixturePath("file3.json");
    const file2 = getFixturePath("file4.json");

    expect(compareFiles(file1, file2)).toBe(result);
  });
});
