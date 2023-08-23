
export const rolesAdminMiddlewares=(req,res,next)=>{
      if(req.user.role !== 'user'){
            next()
      }else{
            res.send({error: ' no tienes acceso '})
      }
}

export const rolesUseriddlewares=(req,res,next)=>{
      if(req.user.role === 'user'){
            next()
      }else{
            res.send({error: ' no tienes acceso '})
      }
}
