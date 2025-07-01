import { stylish } from './stylish.js';
import { plain } from './plain.js';

export const formatter = ({ data, format = 'stylish' }) => {
  switch (format) {
    case 'stylish':
      return stylish(data);
    case 'plain':
      return plain(data);
    default:
      console.error(`Unknown format: ${format}`);
      return stylish(data);
  }
};

export default formatter;
