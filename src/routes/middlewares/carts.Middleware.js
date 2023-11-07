import { ErrorEnum } from '../../services/errors/enum/enums.js'
import CustomError from '../../services/errors/Error/CustomError.class.js'

export const verificarPerteneciaCarrito = (req, res, next) => {
  try{
    if (req.user.cart === req.params.cid) {
    next()
  } else {
    CustomError.createError({
      name: 'You dont have access to this cart',
      cause: 'You dont have acces',
      message: 'You dont have access',
      code: ErrorEnum.ROLE_ERROR
    })
  }
  }
  catch (error) {
    req.logger.error(error)
    next(error)
  }
}
