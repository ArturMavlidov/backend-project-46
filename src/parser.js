import jsToYaml from "js-yaml";

const mapping = {
  yml: jsToYaml.load,
  yaml: jsToYaml.load,
  json: JSON.parse,
};

export const parser = (file, extension) => {
  return mapping[extension.slice(1)](file);
};

export default parser;
