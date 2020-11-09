import debug from 'debug'

import { schemaService } from '../services/schema-services.js'
import { NotFoundError } from '../errors/not-fount-error.js'
import { StatusCodes } from 'http-status-codes'

const log = debug('app:file-controller')

const proccessFile = async (req, res) => {
  log(`Uploading file ${req.file.originalname}`)
  const schema = await schemaService.proccessFile(req.body.name, req.file)
  res.status(StatusCodes.OK).json(schema)
  log(`Uploading file ${req.file.originalname}, done.`)
}

const save = async (req, res) => {
  const schema = await schemaService.create(req.body)
  res.status(StatusCodes.CREATED).json(schema)
}

const update = async (req, res) => {
  const schema = await schemaService.findByName(req.params.schemaName)
  if (schema === null) {
    throw new NotFoundError(`Schema "${req.params.schemaName}" doesn't exists`)
  }
  schema.schemaStructure = req.body.schemaStructure()
  await schema.save()
  req.status(StatusCodes.OK).json(schema)
}

const get = async (req, res) => {
  const schema = await schemaService.findByName(req.params.schemaName)
  if (schema === null) {
    throw new NotFoundError('This schema doesn\'t exists.')
  }

  res.json(schema)
}

const list = async (req, res) => {
  const schemas = await schemaService.listNames()
  res.json(schemas)
}

export const schemaController = {
  fileUpload: proccessFile,
  save,
  update,
  get,
  list
}
