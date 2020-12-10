const NAME_FIELD = 0
const DESCRIPTION_FIELD = 3
const FIELD_TYPE = 4
const SIZE_FIELD = 5
const REQUIRED_FIELD = 6
const REGEX_VALIDATION = 7
const ALLOWED_VALUES = 8
const MIN_OCCURRENCES = 9
const MAX_OCCURRENCES = 10
const OBSERVATION_FIELD = 11

const REQUIRED_KEY = 'Mandatório'
const REQUIRED_KEY_V2 = 'Obrigatório'

const parse = (line) => {
  const obj = {}

  const sanitized = line.map(l => l.trim())

  obj.name = _getFieldName(sanitized[NAME_FIELD])
  obj.level = _getFieldLevel(sanitized[NAME_FIELD])
  obj.description = sanitized[DESCRIPTION_FIELD]
  obj.fieldType = sanitized[FIELD_TYPE]
  obj.size = +sanitized[SIZE_FIELD]
  obj.required = _isRequired(sanitized[REQUIRED_FIELD])
  obj.regexValidation = sanitized[REGEX_VALIDATION]
  obj.allowedValues = _allowedValues(sanitized[ALLOWED_VALUES])
  obj.minOccurrences = _getOccurrences(sanitized[MIN_OCCURRENCES])
  obj.maxOccurrences = _getOccurrences(sanitized[MAX_OCCURRENCES])
  obj.observation = _getObservation(sanitized[OBSERVATION_FIELD])

  return obj
}

const _getFieldName = (line) => {
  return line.replace(/[|.<>]/g, '')
}

const _getFieldLevel = (line) => {
  return (line.match(/\|\.\.\.\.\.\./g) || []).length
}

const _isRequired = (line) => {
  return line === REQUIRED_KEY || line === REQUIRED_KEY_V2
}

const _allowedValues = (line) => {
  if (line === '') {
    return []
  }

  if (/^[A-Z0-9_\- ?]+$/.test(line)) {
    return line.split(' ')
      .filter(v => !!v)
  }

  return [line]
}

const _getOccurrences = (line) => {
  const value = line

  return !line ? '-' : value
}

const _getObservation = (line) => {
  return line === 'NA' || line === 'N/A' ? '' : line
}

export const lineMapper = {
  parse
}
