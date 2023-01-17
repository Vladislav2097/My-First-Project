import _ from 'lodash';
import { ok } from 'node:assert';
import { readFileSync } from 'node:fs';
// import _, { concat } from 'lodash';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';

const statuses = {
  removed: '-',
  theSame: ' ',
  added: '+',
  updated: ' ',
};


const genDiff = (filePath1, filePath2) => {
  let result = [];
  const comparedObjInfo = [];
  const readPath1 = JSON.parse(readFileSync(filePath1, 'utf-8'));
  const readPath2 = JSON.parse(readFileSync(filePath2, 'utf-8'));
  const objectKeys1 = Object.keys(readPath1);
  const objectKeys2 = Object.keys(readPath2);
  const keys = _.uniq([...objectKeys1, ...objectKeys2]);

  keys.forEach((key) => {
    if (!_.has(readPath2, key) && _.has(readPath1, key)) {
      const value = readPath1[key];
      const stringInfo = {
        key,
        value,
        status: 'removed',
      };
      comparedObjInfo.push(stringInfo);
    }
    if (_.has(readPath2, key) && _.has(readPath1, key) && readPath1[key] === readPath2[key]) {
      const value = readPath1[key];
      const stringInfo = {
        key,
        value,
        status: 'theSame',
      };
      comparedObjInfo.push(stringInfo);
    }
    if (_.has(readPath2, key) && !_.has(readPath1, key)) {
      const value = readPath2[key];
      const stringInfo = {
        key,
        value,
        status: 'added',
      };
      comparedObjInfo.push(stringInfo);
    }
    if (_.has(readPath2, key) && _.has(readPath1, key) && (readPath1[key] !== readPath2[key])) {
      const value1 = readPath1[key];
      const value2 = readPath2[key];
      const stringInfo = {
        key,
        value1,
        value2,
        status: 'updated',
      };
      comparedObjInfo.push(stringInfo);
    }
  });
 
  comparedObjInfo.forEach((stringInfo) => {
    if (stringInfo.status === 'updated') {
      result += `${statuses.removed} ${stringInfo.key}: ${stringInfo.value1} \n`;
      result += `${statuses.added} ${stringInfo.key}: ${stringInfo.value2} \n`;
    } else {
      result += `${statuses[stringInfo.status]} ${stringInfo.key}: ${stringInfo.value} \n`;
    }
  });
 
  result = `{\n${result}}`;

  return result;
};

export default genDiff;
