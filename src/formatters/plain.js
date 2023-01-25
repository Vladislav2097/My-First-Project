import _ from 'lodash';

const plain = (objInfo) => {
  const iter = (comparedObjInfo, path) => {
    const lines = comparedObjInfo.flatMap((strInfo) => {
      let property = '';
      if (path !== '') {
        property = `${path}.${strInfo.key}`;
      } else {
        property = strInfo.key;
      }

      if (strInfo.status === 'nested') {
        return iter(strInfo.children, property);
      } if (strInfo.status === 'added') {
        if (_.isPlainObject(strInfo.value)) {
          return `Property '${property}' was added with value: [complex value]`;
        } if (strInfo.value === false) {
          return `Property '${property}' was added with value: ${strInfo.value}`;
        }
        return `Property '${property}' was added with value: '${strInfo.value}'`;
      } if (strInfo.status === 'deleted') {
        return `Property '${property}' was removed`;
      } if (strInfo.status === 'updated') {
        if (_.isPlainObject(strInfo.value1)) {
          return `Property '${property}' was updated. From [complex value] to '${strInfo.value2}'`;
        } if (strInfo.value1 === true && strInfo.value2 === null) {
          return `Property '${property}' was updated. From ${strInfo.value1} to ${strInfo.value2}`;
        } if (strInfo.value1 === true && _.isPlainObject(strInfo.value2)) {
          return `Property '${property}' was updated. From ${strInfo.value1} to [complex value]`;
        } if (strInfo.value1 === null) {
          return `Property '${property}' was updated. From ${strInfo.value1} to '${strInfo.value2}'`;
        }
        return `Property '${property}' was updated. From '${strInfo.value1}' to '${strInfo.value2}'`;
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
