import { ErrorEnum } from '../enum/enums.js'

export const errorMiddleware = (error, req, res, next) => {
  let statusCode = 500; 
  if (res.headersSent) {
    return next(error); 
  }
  switch (error.code) {
    case ErrorEnum.INVALID_TYPES_ERROR:
      statusCode = 400; //400 (Bad Request) para errores de tipos inválidos
      break;
    case ErrorEnum.PARAM_ERROR:
      statusCode = 400; 
      break;
    case ErrorEnum.BODY_ERROR:
      statusCode = 400; 
      break;
    case ErrorEnum.DATABASE_ERROR:
      statusCode = 500; // Código de estado HTTP 500 (Internal Server Error) 
    case ErrorEnum.ROUTING_ERROR:
      statusCode = 404; // Código de estado HTTP 404 (Not Found) para errores de enrutamiento
      break;
    case ErrorEnum.ROLE_ERROR:
      statusCode = 403; // Código de estado HTTP 403 (Forbidden) para errores de roles
      break;
    default:
      statusCode = 500; 
  }

  res.status(statusCode || 500).json({ status: 'error', error: error.name, cause: error.cause });
}
