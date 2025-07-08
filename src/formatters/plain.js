import { isObject } from '../helpers/index.js'

const stringifyValue = (value) => {
  if (isObject(value)) {
    return '[complex value]'
  }

  if (typeof value !== 'string') {
    return value
  }

  return `'${value}'`
}

export const plain = (data) => {
  const iter = (coll, propertyChain = '') =>
    coll.reduce((acc, val) => {
      const { key, status, value, oldValue } = val
      const property = propertyChain ? propertyChain + '.' + key : key

      if (Array.isArray(value)) {
        return `${acc}${iter(value, property)}`
      }

      if (status === 'equals' || status === 'nested') return acc

      const stringifiedValue = stringifyValue(value)
      const stringifiedOldValue = stringifyValue(oldValue)

      const mapping = {
        removed: 'removed',
        added: `added with value: ${stringifiedValue}`,
        updated: `updated. From ${stringifiedOldValue} to ${stringifiedValue}`,
      }

      return `${acc}\nProperty '${property}' was ${mapping[status]}`
    }, '')

  return iter(data).trim()
}

export default plain
