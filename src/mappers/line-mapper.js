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

const parse = (line) => {
  const obj = {}

  obj.name = _getFieldName(line[NAME_FIELD])
  obj.level = _getFieldLevel(line[NAME_FIELD])
  obj.description = line[DESCRIPTION_FIELD]
  obj.fieldType = line[FIELD_TYPE]
  obj.size = +line[SIZE_FIELD]
  obj.required = _isRequired(line[REQUIRED_FIELD])
  obj.regexValidation = line[REGEX_VALIDATION]
  obj.allowedValues = _allowedValues(line[ALLOWED_VALUES])
  obj.minOccurrences = _getOccurrences(line[MIN_OCCURRENCES])
  obj.maxOccurrences = _getOccurrences(line[MAX_OCCURRENCES])
  obj.observation = _getObservation(line[OBSERVATION_FIELD])

  return obj
}

const _getFieldName = (line) => {
  return line.replace(/[|.<>]/g, '').trim()
}

const _getFieldLevel = (line) => {
  return (line.match(/\|\.\.\.\.\.\./g) || []).length
}

const _isRequired = (line) => {
  return line === REQUIRED_KEY
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
  return line === 'NA' ? '' : line
}

export const lineMapper = {
  parse
}
