import debug from 'debug'
import { StatusCodes } from 'http-status-codes'

import { CustomError } from '../errors/custom-error.js'

const log = debug('app:error-handler')

export const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.status()).json({ errors: err.serializeErrors() })
  }
  log(err.stack)
  res.status(StatusCodes.BAD_REQUEST).send({
    errors: [{ message: 'Something went wrong' }]
  })
}
