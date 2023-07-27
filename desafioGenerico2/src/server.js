import express from "express";
import routerMascotas from "./routes/mascotas.router.js";
import routerUsuarios from "./routes/users.router.js";
import __dirname from "./utils.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));

app.use("/api/mascotas/", routerMascotas);
app.use("/api/users/", routerUsuarios);

app.listen(8080, () => {
  console.log("servidor levantado");
});
