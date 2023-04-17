import { Pais } from "../Pais";
import { Provincia } from "../Provincia";

let Paises: Array<Pais> = new Array<Pais>();

export class Controlador_provincia {
  static povincias(_req: any, _res: any) {
    let pais: Pais | undefined;
    pais = Paises.find((pais) => {
      return pais.getid() == Number(_req.params.id);
    });
    if (pais) {
      _res.json(pais.getprovincias());
    }
  }
  static prov_x_id_get(_req: any, _res: any) {
    let pais: Pais | undefined;
    pais = Paises.find((pais) => {
      return pais.getid() == Number(_req.params.id);
    });
    if (pais) {
      _res.json(
        pais.getprovincias().find((prov) => {
          return prov.getid() == Number(_req.params.idp);
        })
      );
    }
  }
  static prov_x_id_put(_req: any, _res: any) {
    let pais: Pais | undefined;

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
    }
  }

  static prov_x_id_patch(_req: any, _res: any) {
    let pais: Pais | undefined;
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
    }
  }

  static prov_x_id_delete(_req: any, _res: any) {
    const pais = Paises.find((item) => {
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
      _res.status(204).send()
  }
  static prov_x_id_post(_req: any, _res: any) {
    let pais: Pais | undefined;
    pais = Paises.find((pais) => {
      return pais.getid() == Number(_req.params.id);
    })
  
    if (pais) {
      let Provincia1: Provincia = new Provincia(_req.body.id, _req.body.name);
      Provincia1.setlluvias(_req.body.lluvias);
      pais.getprovincias().push(Provincia1);
      _res.json(Provincia1);
    }
  }
}
