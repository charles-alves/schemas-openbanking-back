export class CustomError extends Error {
  constructor (statusCode, message) {
    super(message)
    this.statusCode = statusCode
  }

  status () {
    return this.statusCode
  }

  serializeErrors () {
    return [{ message: this.message }]
  }
}
