
export const verificarPerteneciaCarrito=(req,res,next)=>{
      if(req.user.cart === req.params.cid){
            next()
      }else{
            CustomError.createError({
                  name: "You dont have access to this cart",
                  cause: "You dont have acces",
                  message: "You dont have access",
                  code: ErrorEnum.ROLE_ERROR,
            });
            res.send({ error: ' no tienes acceso ' })
            res.send({error: 'No tienes acceso a este carrito'})
      }
}



