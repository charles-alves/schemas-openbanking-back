const FIELDS_TYPE_MAP = {
  Texto: 'String',
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
    dePara: data.dePara,
    allowedValues: data.allowedValues,
    observation: data.observation
  }
}

const _getFieldType = (data) => {
  const isEnum = data.allowedValues.length > 1

  if (FIELDS_TYPE_MAP[data.fieldType] !== undefined) {
    return FIELDS_TYPE_MAP[data.fieldType]
  } else if (isEnum) {
    return 'Enum'
  } else {
    return 'Field'
  }
}

export const dataMapper = {
  createObject
}
