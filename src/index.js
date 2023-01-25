import _ from 'lodash';
import { readFileSync } from 'node:fs';
import path from 'path';
import parse from '../parsers.js';
import stylish from './formatters/stylish.js';
import plain from './formatters/plain.js';
import json from './formatters/json.js';

const compareObjects = (object1, object2) => {
  const objectKeys1 = Object.keys(object1);
  const objectKeys2 = Object.keys(object2);
  const keys = _.sortBy(_.uniq([...objectKeys1, ...objectKeys2]));

  const comparedObjInfo = keys.map((key) => {
    if (_.isPlainObject(object1[key]) && _.isPlainObject(object2[key])) {
      const stringInfo = {
        key,
        children: compareObjects(object1[key], object2[key]),
        status: 'nested',
      };
      return stringInfo;
    } else if (_.has(object2, key) && _.has(object1, key)
              && _.isEqual(object1[key], object2[key])) {
      const value = object1[key];
      const stringInfo = {
        key,
        value,
        status: 'unchanged',
      };
      return stringInfo;
    } else if (_.has(object2, key) && !_.has(object1, key)) {
      const value = object2[key];
      const stringInfo = {
        key,
        value,
        status: 'added',
      };
      return stringInfo;
    } else if (!_.has(object2, key) && _.has(object1, key)) {
      const value = object1[key];
      const stringInfo = {
        key,
        value,
        status: 'deleted',
      };
      return stringInfo;
    } else if (_.has(object2, key) && _.has(object1, key)
              && !_.isEqual(object1[key], object2[key])) {
      const value1 = object1[key];
      const value2 = object2[key];
      const stringInfo = {
        key,
        value1,
        value2,
        status: 'updated',
      };
      return stringInfo;
    }
  });
  return comparedObjInfo;
};

const genDiff = (filePath1, filePath2, formatName) => {
  const format1 = path.extname(filePath1);
  const format2 = path.extname(filePath2);
  const readPath1 = parse(readFileSync(filePath1, 'utf-8'), format1);
  const readPath2 = parse(readFileSync(filePath2, 'utf-8'), format2);
  const comparedObjInfo = compareObjects(readPath1, readPath2);
  switch (formatName) {
    case 'plain':
      return plain(comparedObjInfo);
    case 'json':
      return json(comparedObjInfo);
    default:
      return stylish(comparedObjInfo);
  }
};

export default genDiff;
