import { isObject } from './helpers/index.js'

export const getDiff = ({
  object1,
  object2,
  format,
  propertyTree = '',
  depth = 1,
}) => {
  const object1Entries = Object.entries(object1)
  const object2Keys = Object.keys(object2)

  const object2NewValuesData = object2Keys
    .filter(key => !Object.hasOwn(object1, key))
    .map(key => ({
      status: 'added',
      property: propertyTree ? `${propertyTree}.${key}` : key,
      key,
      value: object2[key],
    }))

  const data = object1Entries.reduce((acc, entry) => {
    const [key, value] = entry

    const isInObject2 = Object.hasOwn(object2, key)
    const valueInObject2 = object2[key]

    const property = propertyTree ? `${propertyTree}.${key}` : key

    if (isObject(value) && isObject(valueInObject2)) {
      return [
        ...acc,
        {
          status: 'equals',
          key,
          property,
          value: getDiff({
            object1: value,
            object2: valueInObject2,
            propertyTree: property,
            depth: depth + 1,
            format,
          }),
        },
      ]
    }

    if (value === valueInObject2) {
      return [
        ...acc,
        {
          status: 'equals',
          property,
          key,
          value,
        },
      ]
    }

    if (!isInObject2) {
      return [
        ...acc,
        {
          status: 'removed',
          property,
          key,
          value,
        },
      ]
    }

    if (value !== valueInObject2) {
      return [
        ...acc,
        {
          status: 'updated',
          oldValue: value,
          value: valueInObject2,
          property,
          key,
        },
      ]
    }

    return acc
  }, object2NewValuesData)

  const sortedData = data.sort((a, b) => a.key.localeCompare(b.key))

  return sortedData
}

export default getDiff
