import debug from 'debug'

import { dataMapperUtils } from './utils/data-mapper-utils.js'

const log = debug('app:data-mapper')

const createObject = (data, level = 0) => {
  log('Creating schema')

  if (data.length === 0) {
    return {}
  }

  return _createObject([...data], level)
}

const _createObject = (data, level) => {
  const meta = {
    fieldType: _getObjectType(data),
    required: true,
    minOccurrences: dataMapperUtils.getOcurrencesValue(data[0].minOccurrences),
    maxOccurrences: dataMapperUtils.getOcurrencesValue(data[0].maxOccurrences)
  }
  const obj = level === 0 ? {} : { meta }
  let lastField = ''

  while (data.length !== 0) {
    const field = data[0]
    const fieldLevel = field.level
    const fieldName = field.name

    if (fieldLevel < level) {
      break
    } else if (fieldLevel === level) {
      obj[fieldName] = dataMapperUtils.createField(field)

      const minOccurrences = dataMapperUtils.getOcurrencesValue(field.minOccurrences)
      if (
        typeof minOccurrences === 'string' ||
        minOccurrences > meta.minOccurrences
      ) {
        meta.minOccurrences = minOccurrences
      }

      const maxOccurrences = dataMapperUtils.getOcurrencesValue(field.maxOccurrences)
      if (
        typeof maxOccurrences === 'string' ||
        maxOccurrences > meta.maxOccurrences
      ) {
        meta.maxOccurrences = maxOccurrences
      }
      data.shift()
    } else if (fieldLevel > level) {
      obj[lastField] = _createObject(data, fieldLevel)
    }

    lastField = fieldName
  }

  return obj
}

const _getObjectType = (data) => {
  const isList = +data[0].maxOccurrences > 1 || data[0].maxOccurrences === 'N'
  return isList ? 'List' : 'Object'
}

export const dataMapper = {
  createObject
}
