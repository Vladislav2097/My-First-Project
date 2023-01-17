import { test, expect } from '@jest/globals';
import genDiff from '../index.js';

const result = `{
  host: hexlet.io 
- timeout: 50 
+ timeout: 20 
- proxy: 123.234.53.22 
- follow: false 
+ verbose: true 
}`;

test('1', () => {
  expect(genDiff('file1.json', 'file2.json')).toBe(result);
});