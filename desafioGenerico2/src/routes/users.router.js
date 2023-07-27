import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send({ });
});

router.get("/mascotas", (req, res) => {
    res.send({ users });
  });

router.post("/", (req, res) => {
  const user = req.body;
  res.send({ status: "success" });
});

export default router;

// las rutas no deben tener validaciones
