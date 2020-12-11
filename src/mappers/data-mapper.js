import { dataMapperV1 } from './data-mapper-v1.js'
import { dataMapperV2 } from './data-mapper-v2.js'

const createObject = (data) => {
  if (!Array.isArray(data) || data.length === 0) {
    return {}
  }

  if (data.some(d => d.fieldType === 'Lista' || d.fieldType === 'Objecto')) {
    return dataMapperV2.createObject(data)
  } else {
    return dataMapperV1.createObject(data)
  }
}

export const dataMapper = {
  createObject
}
