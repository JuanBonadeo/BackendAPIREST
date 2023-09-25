export default class CustomError {
  static createError ({ name = 'Error', cause, message, code = 1 }) {
    const error = new Error(`Code: ${code}         Name: ${name}  \n       Cause: ${cause}\n\n`)
    error.code = code
    error.name = name
    error.cause = cause
    throw error
  }
}
