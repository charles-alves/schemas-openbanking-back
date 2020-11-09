import { StatusCodes } from 'http-status-codes'

import { CustomError } from './custom-error.js'

export class ConflictError extends CustomError {
  constructor (message) {
    super(StatusCodes.CONFLICT, message)
  }
}
