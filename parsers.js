import yaml from 'js-yaml';

const parse = (data, format) => {
  if (format === '.json') {
    return JSON.parse(data);
  } else if (format === '.yml') {
    return yaml.load(data);
  } else if (format === '.yaml') {
    return yaml.load(data);
  } else {
    return 'Eror';
  }
};

export default parse;