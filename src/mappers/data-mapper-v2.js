import debug from 'debug'

import { dataMapperUtils } from './utils/data-mapper-utils.js'

const log = debug('app:data-mapper-v2')

const createObject = (data, level = 0) => {
  log('Creating schema')

  if (data.length === 0) {
    return {}
  }

  return _createObject([...data], level)
}

const _createObject = (data, level) => {
  const obj = { }

  let fieldObj = null
  while (data.length !== 0) {
    const field = data[0]

    if (field.level < level) {
      break;
    } else if (field.level === level) {
      fieldObj = dataMapperUtils.createField(field)
      obj[field.name] = fieldObj
      data.shift()
    } else {
      const children = _createObject(data, field.level)

      Object.entries(children)
        .forEach(([key, value]) => {
          fieldObj[key] = value
        })
    }
  }

  return obj
}

export const dataMapperV2 = {
  createObject
}
