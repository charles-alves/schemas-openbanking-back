const STRING_FIELD_TYPE = 'Texto'
const FIELDS_TYPE_MAP = {
  [STRING_FIELD_TYPE]: 'String',
  Booleano: 'boolean',
  List: 'List',
  Object: 'Object'
}

const createField = (data) => {
  return {
    meta: {
      fieldType: getFieldType(data),
      description: data.description,
      size: data.size,
      required: data.required,
      validation: data.regexValidation,
      allowedValues: _toEnumStructure(data.allowedValues),
      observation: data.observation,
      minOccurrences: getOcurrencesValue(data.minOccurrences),
      maxOccurrences: getOcurrencesValue(data.maxOccurrences)
    }
  }
}

const getFieldType = (data) => {
  if (data.fieldType === '') {
    return 'Object'
  } else if (_isEnum(data)) {
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

const getOcurrencesValue = (ocurrences) => {
  if (ocurrences === '-') {
    return 1
  }
  if (ocurrences.toLowerCase() === 'n') {
    return ocurrences
  }

  const result = +ocurrences

  if (isNaN(result)) {
    throw new Error(`${ocurrences} não é um valor válido para o campo ocorrências`)
  }

  return result
}

export const dataMapperUtils = {
  createField,
  getFieldType,
  getOcurrencesValue
}
