import { stylish } from "./stylish.js";
import { plain } from "./plain.js";

const mapping = {
  stylish: stylish,
  plain: plain,
  json: JSON.stringify,
};

export const formatter = ({ data, format = "stylish" }) => {
  return mapping[format](data);
};

export default formatter;
