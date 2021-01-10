import debug from 'debug'

import { schemaService } from '../services/schema-services.js'
import { NotFoundError } from '../errors/not-fount-error.js'
import { StatusCodes } from 'http-status-codes'

const log = debug('app:file-controller')

const proccessFile = async (req, res) => {
  log(`Uploading file ${req.file.originalname}`)
  const schema = await schemaService.proccessFile(
    req.body.name,
    req.body.group,
    req.file
  )
  res.status(StatusCodes.OK).json(schema)
  log(`Uploading file ${req.file.originalname}, done.`)
}

const save = async (req, res) => {
  const schema = await schemaService.create(req.body)
  res.status(StatusCodes.CREATED).json(schema)
}

const update = async (req, res) => {
  const schema = await _findByName(req.params.schemaName)
  schema.schemaStructure = req.body.schemaStructure()
  await schema.save()
  res.status(StatusCodes.OK).json(schema)
}

const get = async (req, res) => {
  const schema = await _findByName(req.params.schemaName)

  res.json(schema)
}

const _findByName = async (schemaName) => {
  const schema = await schemaService.findByName(schemaName)
  if (schema === null) {
    throw new NotFoundError(`Schema "${schemaName}" doesn't exists`)
  }
  return schema
}

const list = async (req, res) => {
  const schemas = await schemaService.listNames()
  res.json(schemas)
}

const responseStructure = async (req, res) => {
  const jsonResponse = await schemaService.createJsonResponse(req.params.schemaName)
  res.json(jsonResponse)
}

export const schemaController = {
  fileUpload: proccessFile,
  save,
  update,
  get,
  list,
  responseStructure
}
