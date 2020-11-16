const STRING_FIELD_TYPE = 'Texto'
const FIELDS_TYPE_MAP = {
  [STRING_FIELD_TYPE]: 'String',
  Booleano: 'boolean'
}

const createObject = (data, level = 0) => {
  console.log('Creating schema')
  return _createObject([...data], level)
}

const _createObject = (data, level) => {
  const meta = {
    fieldType: _getObjectType(data),
    required: true,
    minOccurrences: 1,
    maxOccurrences: 1
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
      obj[fieldName] = _createField(field)
      const minOccurrences = _getOcurrencesValue(field.minOccurrences)
      const maxOccurrences = _getOcurrencesValue(field.maxOccurrences)

      if (
        typeof minOccurrences === 'string' ||
        minOccurrences > meta.minOccurrences
      ) {
        meta.minOccurrences = minOccurrences
      }
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

const _createField = (data) => {
  return {
    meta: {
      fieldType: _getFieldType(data),
      description: data.description,
      size: data.size,
      required: data.required,
      validation: data.regexValidation,
      allowedValues: _toEnumStructure(data.allowedValues),
      observation: data.observation
    }
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

const _toEnumStructure = (allowedValues) => {
  return allowedValues.reduce((a, v) => {
    a.push({
      enum: /^[A-Z_][A-Z0-9_]*$/.test(v) ? v : null,
      value: v
    })
    return a
  }, [])
}

const _getOcurrencesValue = (ocurrences) => {
  if (ocurrences === '-') {
    return 1
  }
  if (ocurrences.toLowerCase() === 'n') {
    return ocurrences
  }
  return +ocurrences
}

export const dataMapper = {
  createObject
}
