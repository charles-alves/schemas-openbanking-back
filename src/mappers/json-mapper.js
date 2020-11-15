import debug from 'debug'

const log = debug('app:json-mapper')

const createJson = (obj) => {
  const entries = _excludMetaField(obj)
  return entries.reduce((a, [k, v]) => {
    log(`Mapping field ${k}`)
    a[k] = _mapJsonFields(v)
    return a
  }, {})
}

const _mapJsonFields = (obj) => {
  const fields = _excludMetaField(obj)
  let fieldValue = _sheetValue(obj)
  if (_hasSubfields(fields)) {
    fieldValue = _mapSubFields(obj)
  }
  return fieldValue
}

const _excludMetaField = (obj) => {
  return Object.entries(obj)
    .filter(([k]) => k !== 'meta')
}

const _sheetValue = (obj) => {
  const meta = obj.meta
  const validation = meta.validation || meta.fieldType
  const observation = meta.observation !== '' ? ` obs: ${meta.observation}` : ''
  return `${validation};${observation}`
}

const _hasSubfields = (fields) => {
  return fields.length !== 0
}

const _mapSubFields = (obj) => {
  let subFields = createJson(obj)
  if (_isListObject(obj)) {
    subFields = [subFields]
  }
  return subFields
}

const _isListObject = (obj) => {
  return _getFieldType(obj).includes('List')
}

const _getFieldType = (obj) => {
  if (obj.meta !== undefined) {
    return obj.meta.fieldType
  }

  return ''
}

export const jsonMapper = {
  createJson
}
