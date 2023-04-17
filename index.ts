import express from "express";
import { LLuvia } from "./Lluvia";

import * as swaggerUi from "swagger-ui-express";
import * as swaggerDocuments from "./swagger";
import { Controlador_pais } from "./funtions_for_index/controlador_pais";
import { Controlador_provincia } from "./funtions_for_index/Controlador_Provincia";
import { Controlador_lluvias } from "./funtions_for_index/controlador_lluvias";
const app: express.Application = express();

const port = 4000;

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocuments));

app.get("/messi", (_req, _rest) => {
  _rest.send("FUNCIONA");
});

app.get("/paises", (_req, _rest) => {
  Controlador_pais.paises(_req, _rest);
});
app.get("/paises/:id", (_req, _res) => {
  Controlador_pais.pais_x_id_get(_req, _res);
});
app.get("/paises/:id/provincias", (_req, _res) => {
  Controlador_provincia.povincias(_req, _res);
});
app.get("/paises/:id/provincias/:idp", (_req, _res) => {
  Controlador_provincia.prov_x_id_get(_req, _res);
});
app.post("/paises/:id/provincias", (_req, _res) => {
  Controlador_provincia.prov_x_id_post(_req, _res);
});
app.put("/paises/:id/provincias/:idp", (_req, _res) => {
  Controlador_provincia.prov_x_id_put(_req, _res);
});

app.patch("/paises/:id/provincias/:idp", (_req, _res) => {
  Controlador_provincia.prov_x_id_patch(_req, _res);
});
app.delete("/paises/:id/provincias/:idp", (_req, _res) => {
  Controlador_provincia.prov_x_id_delete(_req, _res);
});
app.get("/paises/:id/provincias/:idp/lluvias", (_req, _res) => {
  Controlador_lluvias.lluvias(_req, _res);
});
app.get("/paises/:id/provincias/:idp/lluvias/:idl", (_req, _res) => {
  Controlador_lluvias.lluvia_x_id_get(_req, _res);
});
app.post("/paises/:id/provincias/:idp/lluvias", (_req, _res) => {
  Controlador_lluvias.lluvia_x_id_post(_req, _res);
});
app.put("/paises/:id/provincias/:idp/lluvias/:idl", (_req, _res) => {
  Controlador_lluvias.lluvia_x_id_put(_req, _res);
});
app.patch("/paises/:id/provincias/:idp/lluvias/:idl", (_req, _res) => {
  Controlador_lluvias.lluvia_x_id_patch;
});
app.delete("/paises/:id/provincias/:idp/lluvias/:idl", (_req, _res) => {
  Controlador_lluvias.lluvia_x_id_delete;
});

app.get("/paises/:id/cant_de_lluvias", (_req, _res) => {
  Controlador_pais.pais_x_id_cant_de_lluvias(_req, _res);
});

app.put("/paises/:id", (_req, _res) => {
  Controlador_pais.pais_x_id_put(_req, _res);
});

app.patch("/paises/:id", (_req, _res) => {
  Controlador_pais.pais_x_id_patch(_req, _res);
});

app.delete("/paises/:id", (_req, _res) => {
  Controlador_pais.pais_x_id_delete(_req, _res);
});

app.post("/paises", (_req, _rest) => {
  Controlador_pais.pais_x_id_post(_req, _rest);
});

app.get("/paises/:id/provincia_con_mas_lluvias", (_req, _res) => {
  Controlador_pais.pais_x_id_prov_con_mas_lluvias(_req, _res);
});

app.get("/paises/:id/cant_de_lluvias_en_mes/:mes", (_req, _res) => {
  Controlador_pais.pais_x_id_cant_de_lluvias_en_un_mes(_req, _res);
});

app.listen(port, () => console.log(`Escuchando en el puerto ${port}!`));
