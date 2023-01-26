import { test, expect } from '@jest/globals';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';
import { resJson, resStylish, resPlain } from '../__fixtures__/results.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const path1 = getFixturePath('file1.json');
const path2 = getFixturePath('file2.json');

test.each([
  { resultFileName: resStylish, format: 'stylish' },
  { resultFileName: resPlain, format: 'plain' },
  { resultFileName: JSON.stringify(resJson), format: 'json' },
])('compare and format as $format', ({ resultFileName, format }) => {
  expect(genDiff(path1, path2, format)).toBe(resultFileName);
});
