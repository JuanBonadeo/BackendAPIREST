export default class CustomError {
  static createError ({ name = 'Error', cause, message, code = 1 }) {
    const error = new Error(code + ' - ' + name)
    error.code = code
    error.name = name
    error.cause = cause
    throw error
  }
}
