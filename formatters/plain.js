import _ from 'lodash';

const plain = (objInfo) => {
  const iter = (comparedObjInfo, path) => {
    let lines = comparedObjInfo.flatMap((strInfo) => { 
      let property = '';
      if (path !== '') {
        property = `${path}.${strInfo['key']}`
      } else {
        property = strInfo['key'];
        
      }
      
      if (strInfo.status === 'nested') {
        return iter(strInfo.children, property)
      } else if (strInfo.status === 'added') {
          if (_.isPlainObject(strInfo.value)) {
            return `Property '${property}' was added with value: [complex value]`;
          } else if (strInfo.value === false) {
            return `Property '${property}' was added with value: ${strInfo.value}`;
          } else {
              return `Property '${property}' was added with value: '${strInfo.value}'`;
          }
      } else if (strInfo.status === 'deleted') {
          return `Property '${property}' was removed`;
      } else if (strInfo.status === 'updated') {
          if (_.isPlainObject(strInfo['value1'])) {
            return `Property '${property}' was updated. From [complex value] to '${strInfo['value2']}'`;
          } else if (strInfo.value1 === true && strInfo.value2 === null) {
            return `Property '${property}' was updated. From ${strInfo['value1']} to ${strInfo['value2']}`;
          } else {
            return `Property '${property}' was updated. From '${strInfo['value1']}' to '${strInfo['value2']}'`;
          }
      } else if (strInfo.status === 'unchanged') {
        return _.remove(strInfo);
      }
    })
    return lines;
  };
  
  return [
    ...iter(objInfo, ''),
  ].join('\n')
};

export default plain;