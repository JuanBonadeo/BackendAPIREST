import { Router } from "express";
import { uploader } from "../utils.js";
const router = Router();


router.get("/", (req, res) => {
  res.send({  });

});

router.post("/",uploader.single('thumbnail') ,(req, res) => {
  const mascota = req.body;
  res.send({ status: "success" });
});

export default router;
