import { ErrorEnum } from "../enum/enums.js";

export const errorMiddleware = (error, req, res, next) => {
      console.log(error.cause);
      switch (error.code) {
        case ErrorEnum.INVALID_TYPES_ERROR:
          return res.send({ status: "error", error: error.name, cause: error.cause });
        case ErrorEnum.PARAM_ERROR:
          return res.send({ status: "error", error: error.name, cause: error.cause });
        case ErrorEnum.BODY_ERROR:
          return res.send({ status: "error", error: error.name, cause: error.cause });
        case ErrorEnum.DATABASE_ERROR:
          return res.send({ status: "error", error: error.name, cause: error.cause });            
        case ErrorEnum.ROUTING_ERROR:
          return res.send({ status: "error", error: error.name, cause: error.cause }); 
        default:
          res.send({ status: "error", mensaje: "error no manejado" });
      }
    };