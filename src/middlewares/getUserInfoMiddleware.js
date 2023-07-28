export const getUserInfo = async (req, res, next) => {
    try {
      
      next();
    } catch (err) {
      console.error("Error al obtener el carrito del usuario:", err);
      res.status(500).json({ error: "Error al obtener el carrito del usuario" });
    }
  };
  
 