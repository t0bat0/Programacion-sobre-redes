import { Pais } from "../Pais";

import { Provincia } from "../Provincia";
let Paises: Array<Pais> = new Array<Pais>();

let messicountry: Pais = new Pais(10, "lionel messi");
let messiprovince: Provincia = new Provincia(1010, "mateo");
let messiprovince2: Provincia = new Provincia(1234, "benjamin");

messicountry.provincias.push(messiprovince2);
messicountry.provincias.push(messiprovince);

let Pais2: Pais = new Pais(258, "chad");
let Pais3: Pais = new Pais(19, "uruguay");
Paises.push(Pais2, Pais3, messicountry);

export class Controlador_pais {
  static paises(_req: any, _res: any) {
    _res.json(Paises);
  }
  static pais_x_id_get(_req: any, _res: any) {
    _res.json(
      Paises.find((pais) => {
        return pais.getid() == Number(_req.params.id);
      })
    );
  }
  static pais_x_id_put(_req: any, _res: any) {
    {
      let pais: Pais | undefined;

      pais = Paises.find((item) => {
        return item.id_pais == Number(_req.params.id);
      });
      if (pais) {
        pais.setNombre(_req.body.name);
        pais.setprovincias(_req.body.provincias);
      }
      _res.json(pais);
    }
  }

  static pais_x_id_patch(_req: any, _res: any) {
    let pais: Pais | undefined;
    pais = Paises.find((item) => {
      return item.id_pais == Number(_req.params.id);
    });
    if (pais) {
      if (pais.getnombre() != _req.body.name) {
        pais.setNombre(_req.body.name);
      }
      if (pais.getprovincias != _req.body.provincias) {
        pais.setprovincias(_req.body.provincias);
      }
      _res.json(pais);
    }
  }

  static pais_x_id_delete(_req: any, _res: any) {
    const pais = Paises.find((item) => {
      return item.id_pais == Number(_req.params.id);
    });
    if (pais) {
      delete Paises[Paises.indexOf(pais)];
    }
    _res.status(204).send();
  }
  static pais_x_id_post(_req: any, _res: any) {
    let Pais1: Pais = new Pais(_req.body.id, _req.body.name);
    Paises.push(Pais1);
    _res.json(Pais1);
  }

  static pais_x_id_cant_de_lluvias(_req: any, _res: any) {
    let pais: Pais | undefined;

    pais = Paises.find((pais) => {
      return pais.getid() == Number(_req.params.id);
    });

    if (pais) {
      _res.json(
        pais
          .getprovincias()
          .map((p) => p.getmmlluviastotales())
          .reduce((sum, current) => sum + current, 0)
      );
    }
  }
  static pais_x_id_prov_con_mas_lluvias(_req: any, _res: any) {
    let pais: Pais | undefined;

    pais = Paises.find((pais) => {
      return pais.getid() == Number(_req.params.id);
    });

    if (pais) {
      let provincia_con_mas_lluvias = Math.max(
        ...pais.getprovincias().map((p) => p.getprovinciaconmayorlluvia())
      );
      _res.json(
        pais
          .getprovincias()
          .find(
            (provincia) =>
              provincia.getprovinciaconmayorlluvia() ===
              provincia_con_mas_lluvias
          )
          ?.getnombre()
      );
    }
  }

  static pais_x_id_cant_de_lluvias_en_un_mes(_req: any, _res: any) {
    let pais: Pais | undefined;

    pais = Paises.find((pais) => {
      return pais.getid() == Number(_req.params.id);
    });

    if (pais) {
      _res.json(
        pais
          .getprovincias()
          .map((p) => p.getmmlluviasmensuales(Number(_req.params.mes)))
          .reduce((sum, current) => sum + current, 0) /
          pais.getprovincias().length
      );
    }
  }
}
