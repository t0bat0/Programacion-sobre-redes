import { Pais } from "../Pais";
import { Provincia } from "../Provincia";
import { LLuvia } from "../Lluvia";
import { paisModel } from "../clases_interface/paises_interface";
import { provinciaModel } from "../clases_interface/provincias_interface";
import { lluviaModel } from "../clases_interface/lluvias_interface";
import { log } from "console";
let Paises: Array<Pais> = new Array<Pais>();

export class Controlador_lluvias {
  static lluvias(_req: any, _res: any) {
    paisModel
      .findById({ _id: _req.params.id })
      .exec()
      .then((pais) => {
        provinciaModel
          .find({ _id: pais!.provincias })
          .exec()
          .then((provincias) => {
            const prov = provincias.flatMap((v) => v.lluvias);
            // console.log(prov)
            lluviaModel
              .find({ _id: prov })
              .exec()
              .then((lluvias2) => {
                _res.send(lluvias2).status(200);
              });
          });
      });
    /*let pais: Pais | undefined;
    pais = Paises.find((pais) => {
      return pais.getid() == Number(_req.params.id);
    });
    if (pais) {
      let provincia: Provincia | undefined;
      provincia = pais.getprovincias().find((prov) => {
        return prov.getid() == Number(_req.params.idp);
      });
      if (provincia) {
        _res.json(provincia.getlluvias);
      }
    }*/
  }
  static lluvia_x_id_get(_req: any, _res: any) {
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
              .then((provincia) => {
                let array_ids = provincia.flatMap((ll) => ll.lluvias);

                lluviaModel
                  .find({ _id: array_ids })
                  .exec()
                  .then((ll) => {
                    lluviaModel
                      .findById({ _id: _req.params.idl })
                      .exec()
                      .then((lluvia) => {
                        _res.status(200).send(lluvia);
                      });
                  });
              });
          });
      });
    /*let pais: Pais | undefined;
    pais = Paises.find((pais) => {
      return pais.getid() == Number(_req.params.id);
    });
    if (pais) {
      let provincia: Provincia | undefined;
      provincia = pais.getprovincias().find((prov) => {
        return prov.getid() == Number(_req.params.idp);
      });
      if (provincia) {
        let Lluvia: LLuvia | undefined;
        Lluvia = provincia.getlluvias().find((ll) => {
          return ll.getid() == Number(_req.params.idl);
        });
        _res.json(Lluvia);
      }
    }*/
  }
  static lluvia_x_id_put(_req: any, _res: any) {
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
              .then((provincia) => {
                let array_ids = provincia.flatMap((ll) => ll.lluvias);

                lluviaModel
                  .find({ _id: array_ids })
                  .exec()
                  .then((ll) => {
                    lluviaModel
                      .findOneAndReplace({ _id: _req.params.idl }, _req.body)
                      .then((lluvia) => {
                        console.log(lluvia);

                        _res.status(200).send(lluvia);
                      });
                  });
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
        let lluvia: LLuvia | undefined;
        lluvia = provincia.getlluvias().find((ll) => {
          return ll.getid() == Number(_req.params.idl);
        });
        if (lluvia) {
          lluvia.setmm_de_agua(_req.body.mm_de_agua);
          lluvia.setfecha(_req.body.fecha);
        }
        _res.json(lluvia);
      }
    }*/
  }

  static lluvia_x_id_patch(_req: any, _res: any) {
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
              .then((provincia) => {
                let array_ids = provincia.flatMap((ll) => ll.lluvias);
                lluviaModel
                  .find({ _id: array_ids })
                  .exec()
                  .then((ll) => {
                    lluviaModel
                      .findByIdAndUpdate({ _id: _req.params.idl }, _req.body, {
                        new: true,
                      })
                      .then((lluvia) => {
                        console.log(lluvia);

                        _res.status(200).send(lluvia);
                      });
                  });
              });
          });
      });

    /* let pais: Pais | undefined;
    pais = Paises.find((item) => {
      return item.id_pais == Number(_req.params.id);
    });
    if (pais) {
      let provincia: Provincia | undefined;
      provincia = pais.getprovincias().find((prov) => {
        return prov.getid() == Number(_req.params.idp);
      });
      if (provincia) {
        let lluvia: LLuvia | undefined;
        lluvia = provincia.getlluvias().find((ll) => {
          return ll.getid() == Number(_req.params.idl);
        });
        if (lluvia) {
          if (lluvia.getmm_de_agua != _req.body.mm_de_agua) {
            lluvia.setmm_de_agua(_req.body.mm_de_agua);
          }
          if (lluvia.getfecha != _req.body.fecha) {
            lluvia.setfecha(_req.body.fecha);
          }
        }
      }
      _res.json(LLuvia);
    }*/
  }

  static lluvia_x_id_delete(_req: any, _res: any) {
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
              .then((provincia) => {
                let array_ids = provincia.flatMap((ll) => ll.lluvias);
                lluviaModel
                  .find({ _id: array_ids })
                  .exec()
                  .then((ll) => {
                    lluviaModel
                      .findOneAndDelete({ _id: _req.params.idl })
                      .then((lluvia) => {
                        console.log(lluvia);

                        _res.status(200).send(lluvia);
                      });
                  });
              });
          });
      });
    /* const pais = Paises.find((item) => {
      return item.id_pais == Number(_req.params.id);
    });
    if (pais) {
      let provincia: Provincia | undefined;
      provincia = pais.getprovincias().find((prov) => {
        return prov.getid() == Number(_req.params.idp);
      });
      if (provincia) {
        let lluvia: LLuvia | undefined;
        lluvia = provincia.getlluvias().find((ll) => {
          return ll.getid() == Number(_req.params.idl);
        });
        if (lluvia) {
          delete provincia.lluvias[provincia.lluvias.indexOf(lluvia)];
        }
      }
    }
    _res.status(204).send();*/
  }
  static lluvia_x_id_post(_req: any, _res: any) {
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
              .then((provincia) => {
                lluviaModel.create(_req.body).then((lluvia) => {
                  lluvia.save().then((ll) => {
                    provincia[0].lluvias.push(
                      //@ts-ignore
                      ll._id
                    );
                    provinciaModel
                      .findOneAndUpdate(
                        { _id: _req.params.idp },
                        { lluvias: provincia[0].lluvias }
                      )
                      .then((lluviacreada) => {
                        _res.send(lluvia).status(200);
                      });
                  });
                });
              });
          });
      });

    /*let pais: Pais | undefined;
    pais = Paises.find((pais) => {
      return pais.getid() == Number(_req.params.id);
    });

    if (pais) {
      let provincia: Provincia | undefined;
      provincia = pais.getprovincias().find((prov) => {
        return prov.getid() == Number(_req.params.idp);
      });
      if (provincia) {
        let lluvias1: LLuvia = new LLuvia(_req.body.id, _req.body.mm_de_agua);
        lluvias1.setfecha(_req.body.fecha);
        provincia.getlluvias().push(lluvias1);
        _res.json(lluvias1);
      }
    }*/
  }
}
