import _ from 'lodash';

const stringify = (value) => {
  if (typeof value === 'boolean' || value === null || value === 0) {
    return value;
  } if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  return `'${value}'`;
};

const plain = (objInfo) => {
  const iter = (comparedObjInfo, path) => {
    const lines = comparedObjInfo.flatMap((strInfo) => {
      const property = path !== '' ? `${path}.${strInfo.key}` : strInfo.key;

      if (strInfo.status === 'nested') {
        return iter(strInfo.children, property);
      } if (strInfo.status === 'added') {
        return `Property '${property}' was added with value: ${stringify(strInfo.value)}`;
      } if (strInfo.status === 'deleted') {
        return `Property '${property}' was removed`;
      } if (strInfo.status === 'updated') {
        return `Property '${property}' was updated. From ${stringify(strInfo.value1)} to ${stringify(strInfo.value2)}`;
      } if (strInfo.status === 'unchanged') {
        return _.remove(strInfo);
      }

      return 'Err';
    });
    return lines;
  };

  return [
    ...iter(objInfo, ''),
  ].join('\n');
};

export default plain;
