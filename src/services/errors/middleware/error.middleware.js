import { ErrorEnum } from '../enum/enums.js'

export const errorMiddleware = (error, req, res, next) => {
  let statusCode = 500; // Por defecto, código de estado HTTP 500 (Internal Server Error)
  if (res.headersSent) {
    return next(error); // Si las cabeceras ya se enviaron, pasa el error a la siguiente capa de manejo de errores
  }
  switch (error.code) {
    case ErrorEnum.INVALID_TYPES_ERROR:
      statusCode = 400; // Código de estado HTTP 400 (Bad Request) para errores de tipos inválidos
      break;
    case ErrorEnum.PARAM_ERROR:
      statusCode = 400; // Código de estado HTTP 400 (Bad Request) para errores de parámetros
      break;
    case ErrorEnum.BODY_ERROR:
      statusCode = 400; // Código de estado HTTP 400 (Bad Request) para errores de cuerpo de solicitud
      break;
    case ErrorEnum.DATABASE_ERROR:
      statusCode = 500; // Código de estado HTTP 500 (Internal Server Error) para errores de base de datos
      break;
    case ErrorEnum.ROUTING_ERROR:
      statusCode = 404; // Código de estado HTTP 404 (Not Found) para errores de enrutamiento
      break;
    case ErrorEnum.ROLE_ERROR:
      statusCode = 403; // Código de estado HTTP 403 (Forbidden) para errores de roles
      break;
    default:
      statusCode = 500; // Código de estado HTTP 500 (Internal Server Error) para errores no manejados
  }

  res.status(statusCode || 500).json({ status: 'error', error: error.name, cause: error.cause });
}
