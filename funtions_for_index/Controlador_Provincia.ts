import mongoose from "mongoose";
import { Pais } from "../Pais";
import { Provincia } from "../Provincia";
import { paisModel } from "../clases_interface/paises_interface";
import { provinciaModel } from "../clases_interface/provincias_interface";

let Paises: Array<Pais> = new Array<Pais>();

export class Controlador_provincia {
  static povincias(_req: any, _res: any) {
    paisModel
      .findById({ _id: _req.params.id })
      .exec()
      .then((pais) => {
        provinciaModel
          .find({ _id: pais!.provincias })
          .exec()
          .then((provincias) => {
            _res.send(provincias).status(200);
          });
      });

    /*let pais: Pais | undefined;
    pais = Paises.find((pais) => {
      return pais.getid() == Number(_req.params.id);
    });
    if (pais) {
      _res.json(pais.getprovincias());
    }*/
  }
  static prov_x_id_get(_req: any, _res: any) {
    paisModel
      .findById({ _id: _req.params.id })
      .exec()
      .then((pais) => {
        provinciaModel
          .find({ _id: pais!.provincias })
          .exec()
          .then((provincias) => {
            provinciaModel
              .find({ _id: _req.params.idp })
              .exec()
              .then((prov) => {
                console.log(prov);
                _res.send(prov).status(200);
              });
          });
      });
    /* let pais: Pais | undefined;
    pais = Paises.find((pais) => {
      return pais.getid() == Number(_req.params.id);
    });
    if (pais) {
      _res.json(
        pais.getprovincias().find((prov) => {
          return prov.getid() == Number(_req.params.idp);
        })
      );
    }*/
  }
  static prov_x_id_put(_req: any, _res: any) {
    paisModel
      .findById({ _id: _req.params.id })
      .exec()
      .then((pais) => {
        provinciaModel
          .find({ _id: pais!.provincias })
          .exec()
          .then((provincias) => {
            provinciaModel
              .findOneAndReplace({ _id: _req.params.idp }, _req.body)
              .then((prov) => {
                console.log(prov);
                _res.send(prov).status(200);
              });
          });
      });

    /*let pais: Pais | undefined;

    pais = Paises.find((item) => {
      return item.id_pais == Number(_req.params.id);
    });

    if (pais) {
      let provincia: Provincia | undefined;
      provincia = pais.getprovincias().find((prov) => {
        return prov.getid() == Number(_req.params.idp);
      });
      if (provincia) {
        provincia.setNombre(_req.body.name);
        provincia.setlluvias(_req.body.lluvias);
      }
      _res.json(provincia);
    }*/
  }

  static prov_x_id_patch(_req: any, _res: any) {
    
    paisModel
      .findById({ _id: _req.params.id })
      .exec()
      .then((pais) => {
        provinciaModel
          .find({ _id: pais!.provincias })
          .exec()
          .then((provincias) => {
            provinciaModel
              .findOneAndUpdate({ _id: _req.params.idp }, _req.body)
              .then((prov) => {
                console.log(prov);
                _res.send(prov).status(200);
              });
          });
      });

    /*  let pais: Pais | undefined;
    pais = Paises.find((item) => {
      return item.id_pais == Number(_req.params.id);
    });
    if (pais) {
      let provincia: Provincia | undefined;
      provincia = pais.getprovincias().find((prov) => {
        return prov.getid() == Number(_req.params.idp);
      });
      if (provincia) {
        if (provincia.getnombre() != _req.body.name) {
          provincia.setNombre(_req.body.name);
        }
        if (provincia.getlluvias != _req.body.lluvias) {
          provincia.setlluvias(_req.body.lluvias);
        }
      }
      _res.json(provincia);
    }*/
  }

  static prov_x_id_delete(_req: any, _res: any) {
    paisModel
      .findById({ _id: _req.params.id })
      .exec()
      .then((pais) => {
        provinciaModel
          .find({ _id: pais!.provincias })
          .exec()
          .then((provincias) => {
            provinciaModel
              .findOneAndDelete({ _id: _req.params.idp })
              .then((prov) => {
                _res.status(200);
              });
          });
      });

    /*const pais = Paises.find((item) => {
      return item.id_pais == Number(_req.params.id);
    });
    if (pais) {
      let provincia: Provincia | undefined;
      provincia = pais.getprovincias().find((prov) => {
        return prov.getid() == Number(_req.params.idp);
      });
      if (provincia) {
        delete pais.provincias[pais.provincias.indexOf(provincia)];
      }
    }
    _res.status(204).send();*/
  }
  static prov_x_id_post(_req: any, _res: any) {
    paisModel
      .findById({ _id: _req.params.id })
      .exec()
      .then((pais) => {
        provinciaModel
          .find({ _id: pais!.provincias })
          .exec()
          .then((provincias) => {
            provinciaModel.create(_req.body).then((prov) => {
              prov.save().then((prov1) => {
                pais!.provincias.push(
                  //@ts-ignore
                  prov1._id
                );

                console.log(pais!.provincias);
                paisModel
                  .findOneAndUpdate(
                    { _id: _req.params.id },
                    { provincias: pais!.provincias }
                  )
                  .then((godo) => {
                    _res.send(prov).status(200);
                  });
              });
              //  console.log(a)
              //

              // console.log(prov.save());
            });
          });
      });
    /*let pais: Pais | undefined;
    pais = Paises.find((pais) => {
      return pais.getid() == Number(_req.params.id);
    });

    if (pais) {
      let Provincia1: Provincia = new Provincia(_req.body.id, _req.body.name);
      Provincia1.setlluvias(_req.body.lluvias);
      pais.getprovincias().push(Provincia1);
      _res.json(Provincia1);
    }*/
  }
}
