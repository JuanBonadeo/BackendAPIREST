import { ErrorEnum } from '../../services/errors/enum/enums.js'
import CustomError from '../../services/errors/Error/CustomError.class.js'

export const rolesAdminPremiumMiddlewares = (req, res, next) => {
  try {
    if (req.user.role === 'admin' || req.user.role === 'premium') {
      next(); 
    } else {
      CustomError.createError({
        name: 'You dont have access',
        cause: 'you dont have the admin or premium role',
        message: 'You dont have access',
        code: ErrorEnum.ROLE_ERROR
      });
    }
  } catch (error) {
    req.logger.error(error);
    next(error);
  }
}

export const rolesUserMiddlewares = (req, res, next) => {
  try {
    if (req.user.role === 'user') {
      next()
    } else {
      CustomError.createError({
        name: 'You dont have access',
        cause: 'you dont have the user role',
        message: 'You dont have access',
        code: ErrorEnum.ROLE_ERROR
      })
    }
  } catch (error) {
    req.logger.error(error)
    next(error)
  }
}

export const rolesPremiumMiddlewares = (req, res, next) => {
  try {
    if (req.user.role === 'Premium') {
      next()
    } else {
      CustomError.createError({
        name: 'You dont have access',
        cause: 'You dont have the premium role',
        message: 'You dont have access',
        code: ErrorEnum.ROLE_ERROR
      })
    }
  } catch (error) {
    req.logger.error(error)
    next(error)
  }
}

