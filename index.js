import _ from 'lodash';
import { ok } from 'node:assert';
import { readFileSync } from 'node:fs';
// import _, { concat } from 'lodash';
import path from 'path';
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';
// import fs from 'fs';
import parse from './parsers.js';
import stylish from './__fixtures__/stylish.js';


const compareObjects = (object1, object2) => {
  const comparedObjInfo = [];
  const objectKeys1 = Object.keys(object1);
  const objectKeys2 = Object.keys(object2);
  const keys = _.uniq([...objectKeys1, ...objectKeys2]);

  keys.forEach((key) => {
    if (_.isPlainObject(object1[key]) && _.isPlainObject(object2[key])) {
      const stringInfo = {
        key,
        children: compareObjects(object1[key], object2[key]),
        status: 'nested',
      };
      comparedObjInfo.push(stringInfo);
    } else if (_.has(object2, key) && _.has(object1, key) && _.isEqual(object1[key], object2[key])) {
      const value = object1[key];
      const stringInfo = {
        key,
        value,
        status: 'unchanged',
      };
      comparedObjInfo.push(stringInfo);
    } else if (_.has(object2, key) && !_.has(object1, key)) {
      const value = object2[key];
      const stringInfo = {
        key,
        value,
        status: 'added',
      };
      comparedObjInfo.push(stringInfo);
    } else if (!_.has(object2, key) && _.has(object1, key)) {
      const value = object1[key];
      const stringInfo = {
        key,
        value,
        status: 'deleted',
      };
      comparedObjInfo.push(stringInfo);
    } else if (_.has(object2, key) && _.has(object1, key) && !_.isEqual(object1[key], object2[key])) {
      const value1 = object1[key];
      const value2 = object2[key];
      const stringInfo = {
        key,
        value1,
        value2,
        status: 'updated',
      };
      comparedObjInfo.push(stringInfo);
    }
    
    
    // console.log(JSON.stringify(comparedObjInfo));
    
  });
  return comparedObjInfo;
}


const genDiff = (filePath1, filePath2) => {
  const format1 = path.extname(filePath1);
  const format2 = path.extname(filePath2);
  const readPath1 = parse(readFileSync(filePath1, 'utf-8'), format1);
  const readPath2 = parse(readFileSync(filePath2, 'utf-8'), format2);
  const comparedObjInfo = compareObjects(readPath1, readPath2)

  return stylish(comparedObjInfo);
};

export default genDiff;
