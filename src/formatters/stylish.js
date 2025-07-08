import { isObject } from '../helpers/index.js'

const stringify = ({
  value,
  replacer = ' ',
  spacesCount = 2,
  depth: initialDepth = 1,
}) => {
  const iter = (currentValue, depth) => {
    if (typeof currentValue !== 'object' || currentValue === null) {
      return `${currentValue}`
    }

    const indentSize = depth * spacesCount
    const currentIndent = replacer.repeat(indentSize)
    const bracketIndent = replacer.repeat(indentSize - spacesCount)
    const lines = Object.entries(currentValue).map(
      ([key, val]) => `${currentIndent}${key}: ${iter(val, depth + 1)}`,
    )

    return ['{', ...lines, `${bracketIndent}}`].join('\n')
  }

  return iter(value, initialDepth)
}

const mapper = {
  equals: '  ',
  nested: '  ',
  added: '+ ',
  updated: '+ ',
  removed: '- ',
}

const getStyledValue = (value, depth, cb) => {
  if (Array.isArray(value)) {
    return cb(value, depth + 1)
  }

  if (isObject(value)) {
    return stringify({
      value,
      spacesCount: 4,
      depth: depth + 1,
    })
  }

  if (value === '') {
    return ' '
  }

  return value
}

export const stylish = (data, depth = 1) => {
  const result = data.reduce((acc, val) => {
    const sign = mapper[val.status]
    const spaces = ' '.repeat(depth * 4 - sign.length)

    const getStyledRow = (value, currentSign) => `\n${spaces}${currentSign}${val.key}:${
      value === '' ? '' : ' '
    }${getStyledValue(value, depth, stylish)}`

    const styledRow = getStyledRow(val.value, sign)

    if (val.oldValue !== undefined) {
      return acc + getStyledRow(val.oldValue, mapper.removed) + styledRow
    }

    return `${acc}${styledRow}`
  }, '')

  return `{${result}\n${' '.repeat((depth - 1) * 4)}}`
}

export default stylish
