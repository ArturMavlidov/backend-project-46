import { isObject } from './helpers/index.js'

export const getDiff = ({ object1, object2, format, depth = 1 }) => {
  const object1Keys = Object.keys(object1)
  const object2Keys = Object.keys(object2)

  const objectsKeys = object1Keys.concat(object2Keys)
  const uniqObjectsKeys = Array.from(new Set(objectsKeys))

  const data = uniqObjectsKeys.map((key) => {
    const value = object1[key]
    const isInObject1 = Object.hasOwn(object1, key)
    const isInObject2 = Object.hasOwn(object2, key)
    const valueInObject2 = object2[key]

    if (!isInObject1) {
      return {
        status: 'added',
        key,
        value: object2[key],
      }
    }

    if (isObject(value) && isObject(valueInObject2)) {
      return {
        status: 'equals',
        key,
        value: getDiff({
          object1: value,
          object2: valueInObject2,
          depth: depth + 1,
          format,
        }),
      }
    }

    if (value === valueInObject2) {
      return {
        status: 'equals',
        key,
        value,
      }
    }

    if (!isInObject2) {
      return {
        status: 'removed',
        key,
        value,
      }
    }

    if (value !== valueInObject2) {
      return {
        status: 'updated',
        oldValue: value,
        value: valueInObject2,
        key,
      }
    }
  })

  const sortedData = data.sort((a, b) => a.key.localeCompare(b.key))

  return sortedData
}

export default getDiff
