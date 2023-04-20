import { LLuvia } from "../Lluvia";
import { Pais } from "../Pais";

import { Provincia } from "../Provincia";
import { paisModel } from "../clases_interface/paises_interface";
let Paises: Array<Pais> = new Array<Pais>();

let messicountry: Pais = new Pais(10, "lionel messi");
let messiprovince: Provincia = new Provincia(1010, "mateo");
let messiprovince2: Provincia = new Provincia(1234, "benjamin");
let messilluvia: LLuvia = new LLuvia(10,10)
messiprovince.lluvias.push(messilluvia)
messicountry.provincias.push(messiprovince2);
messicountry.provincias.push(messiprovince);

let Pais2: Pais = new Pais(258, "chad");
let Pais3: Pais = new Pais(19, "uruguay");
Paises.push(Pais2, Pais3, messicountry);

export class  Controlador_pais {
  static async paises(_req: any, _res: any) {
  // testModel.deleteOne({"_id": req.params.id})
  // testModel.updateOne({"nombre": "mbappe"}, {"trolo": true})
  // const a = testModel.findOneAndUpdate({"nombre": "mbappe"}, {"trolo": true})
  // const pais = await paisModel.find({ "_id": req.params.id })
  // const array_ids = pais.provicias
  // array_ids.forEach( id => { const provincias_del_pais = await provinciaModel.find({"_id": id})} )
  

    _res.send(await paisModel.find())
  }
  static async pais_x_id_get(_req: any, _res: any) {
    _res.send(await paisModel.find({"_id": _req.params.id}))
    //const pais = await paisModel.findById({ "_id": _req.params.id }).exec()
   //  const array_ids = pais?.provincias || []
    // array_ids.forEach( id => { const provincias_del_pais = await provinciaModel.find({"_id": id})} )
    
  }
  static async pais_x_id_put(_req: any, _res: any) {
    {
      const pais = await paisModel.create(_req.body)
      _res.status(201).send(pais)
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
