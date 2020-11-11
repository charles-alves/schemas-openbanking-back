const STRING_FIELD_TYPE = 'Texto'
const FIELDS_TYPE_MAP = {
  [STRING_FIELD_TYPE]: 'String',
  Booleano: 'boolean'
}

const createObject = (data, level = 0) => {
  return _createObject([...data], level)
}

const _createObject = (data, level) => {
  const obj = level === 0 ? {} : { fieldType: _getObjectType(data) }
  let lastField = ''

  while (data.length !== 0) {
    const field = data[0]
    const fieldLevel = field.level
    const fieldName = field.name

    if (fieldLevel < level) {
      break
    } else if (fieldLevel === level) {
      obj[fieldName] = _createField(field)
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

const _createField = (data) => {
  return {
    fieldType: _getFieldType(data),
    description: data.description,
    size: data.size,
    required: data.required,
    validation: data.regexValidation,
    allowedValues: data.allowedValues,
    observation: data.observation
  }
}

const _getFieldType = (data) => {
  if (_isEnum(data)) {
    return 'Enum'
  } else if (FIELDS_TYPE_MAP[data.fieldType] !== undefined) {
    return FIELDS_TYPE_MAP[data.fieldType]
  } else {
    return 'Field'
  }
}

const _isEnum = (data) => {
  return data.fieldType === STRING_FIELD_TYPE &&
    data.allowedValues.length > 1
}

export const dataMapper = {
  createObject
}
