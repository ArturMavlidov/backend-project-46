import { stylish } from './stylish.js'
import { plain } from './plain.js'

const mapping = {
  stylish,
  plain,
  json: JSON.stringify,
}

export const formatter = ({ data, format = 'stylish' }) => mapping[format](data)

export default formatter
