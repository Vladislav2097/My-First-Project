import _ from 'lodash';

const keyOffset = 4;
const prefixOffset = 2;
const indentSymbol = '.';
const openSymbol = '{';
const closeSymbol = '}';
const labels = {
  deleted: '-',
  added: '+',
  unchanged: '*',
  nested: '>'
};


const stringify = (value, depth) => {
  
  if (!_.isObject(value)) {
    return `${value}`;
  }

  const indentSize = depth * keyOffset;
  const currentIndent = indentSymbol.repeat(indentSize);
  const bracketIndent = indentSymbol.repeat(indentSize - keyOffset);
  const lines = Object
    .entries(value)
    .map(([key, val]) => `${currentIndent}${key}: ${stringify(val, depth + 1)}`);
    
  return [
    '{',
    ...lines,
    `${bracketIndent}}`,
  ].join('\n');
};

const addPrefix = (key, status, indent) => `${indent}${labels[status]} ${key}`;

const stylish = (objInfo) => {
  const iter = (comparedObjInfo, depth = 1) => {
    let keyIndent = indentSymbol.repeat(keyOffset);
    let lines = comparedObjInfo.map((strInfo) => { // {key: string, status: 'nested' | 'deleted'..., value: string | children: object | value1: string, value2: string}
      if (strInfo.status === 'nested') {
        return `${addPrefix(strInfo['key'], strInfo.status, keyIndent)}: {\n${iter(strInfo.children, depth + 1)}}`
      } else if (strInfo.status === 'added') {
        
        return `${addPrefix(strInfo['key'], strInfo.status, keyIndent)}: ${stringify(strInfo['value'], depth)}\n`
      } else if (strInfo.status === 'deleted') {
        
        return `${addPrefix(strInfo['key'], strInfo.status, keyIndent)}: ${stringify(strInfo['value'], depth)}\n`
      } else if (strInfo.status === 'unchanged') {
        
        return `${addPrefix(strInfo['key'], strInfo.status, keyIndent)}: ${stringify(strInfo['value'], depth)}\n`
      } else if (strInfo.status === 'updated') {
        
        const revovedStr = `${addPrefix(strInfo['key'], 'deleted', keyIndent)}: ${stringify(strInfo['value1'], depth)}`
        const addedStr = `${addPrefix(strInfo['key'], 'added', keyIndent)}: ${stringify(strInfo['value2'], depth)}\n`
        return `${revovedStr}\n${addedStr}`;
        
      } else {
        console.log(stringify(strInfo['value'], depth))
        keyIndent = indentSymbol.repeat(keyOffset + prefixOffset);
        // return `${addPrefix(strInfo['key'], strInfo.status, keyIndent)}: ${stringify(strInfo['value'], depth)}\n`
      }
    })
    return lines;
  };
  
  return [
    '{',
    ...iter(objInfo, 1),
    '}',
  ].join('\n')
};


export default stylish;