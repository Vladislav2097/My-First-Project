import { test, expect } from '@jest/globals';
import genDiff from '../index.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
// const readPath = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
const path1 = getFixturePath('file1.json');
const path2 = getFixturePath('file2.json');

const result = `{
  host: hexlet.io 
- timeout: 50 
+ timeout: 20 
- proxy: 123.234.53.22 
- follow: false 
+ verbose: true 
}`;

test('1', () => {
  expect(genDiff(path1, path2)).toBe(result);
});