import { test, expect } from '@jest/globals';
import genDiff from '../formatters/index.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const path1 = getFixturePath('file1.json');
const path2 = getFixturePath('file2.json');

test('1', () => {
  const result1 = fs.readFileSync(getFixturePath('result1.txt'), 'utf-8');
  expect(genDiff(path1, path2, 'stylish')).toBe(result1);
});

test('2', () => {
  const result2 = fs.readFileSync(getFixturePath('result2.txt'), 'utf-8');
  expect(genDiff(path1, path2, 'plain')).toBe(result2);
});

test('3', () => {
  const result3 = fs.readFileSync(getFixturePath('result3.json'), 'utf-8');
  expect(genDiff(path1, path2, 'json')).toBe(result3);
});
