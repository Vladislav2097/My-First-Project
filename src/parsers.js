import yaml from 'js-yaml';

const parse = (data, format) => {
  if (format === 'json') {
    return JSON.parse(data);
  } 
  
  if (format === 'yml') {
    return yaml.load(data);
  } 
  
  if (format === 'yaml') {
    return yaml.load(data);
  }
  
  return 'Eror';
};

export default parse;
