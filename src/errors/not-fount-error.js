import { StatusCodes } from 'http-status-codes'

import { CustomError } from './custom-error.js'

export class NotFoundError extends CustomError {
  constructor (message) {
    super(StatusCodes.NOT_FOUND, message)
  }
}
