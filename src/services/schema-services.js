import { lineMapper } from '../mappers/line-mapper.js'
import { dataMapper } from '../mappers/data-mapper.js'
import { Schema } from '../models/schema.js'
import { ConflictError } from '../errors/conflict-error.js'
import { NotFoundError } from '../errors/not-fount-error.js'
import { jsonMapper } from '../mappers/json-mapper.js'

const proccessFile = async (schemaName, multipartFile) => {
  const fileStr = multipartFile.buffer.toString()
  const data = _sanitizeFile(fileStr)
  const structure = _createSchemaStructure(data)
  return {
    name: schemaName,
    structure
  }
}

const _sanitizeFile = (fileData) => {
  const lines = fileData.split('\r\n')
  lines.shift()
  return lines
    .filter(l => !!l)
    .map(lines => lines.split('<sep>'))
}

const _createSchemaStructure = (data) => {
  const schemaData = data.map(d => lineMapper.parse(d))
  return dataMapper.createObject(schemaData)
}

const create = async (schema) => {
  await _validateSchemaName(schema.name)
  const id = await Schema.create(schema)
  schema.id = id
  return schema
}

const _validateSchemaName = async (schemaName) => {
  const exists = await Schema.exists({
    name: schemaName
  })

  if (exists) {
    throw new ConflictError('This schema alread exists, maybe you can edit it.')
  }
}

const findByName = async (schemaName) => {
  return Schema.findOne({ name: schemaName })
}

const listNames = () => {
  return Schema.find({}, 'name')
}

const createJsonResponse = async (schemaName) => {
  const schema = await findByName(schemaName)
  if (schema === null) {
    throw new NotFoundError(`Schema "${schemaName}" doesn't exists`)
  }
  return jsonMapper.createJson(schema.structure)
}

export const schemaService = {
  proccessFile,
  create,
  findByName,
  listNames,
  createJsonResponse
}
