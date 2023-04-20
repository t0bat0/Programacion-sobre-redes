import { AnyArray, Schema } from "mongoose";
import { LLuvia } from "../Lluvia";
import { Pais } from "../Pais";

import { Provincia } from "../Provincia";
import { lluviaModel } from "../clases_interface/lluvias_interface";
import { paisModel } from "../clases_interface/paises_interface";
import { provinciaModel } from "../clases_interface/provincias_interface";
let Paises: Array<Pais> = new Array<Pais>();

let messicountry: Pais = new Pais(10, "lionel messi");
let messiprovince: Provincia = new Provincia(1010, "mateo");
let messiprovince2: Provincia = new Provincia(1234, "benjamin");
let messilluvia: LLuvia = new LLuvia(10, 10);
messiprovince.lluvias.push(messilluvia);
messicountry.provincias.push(messiprovince2);
messicountry.provincias.push(messiprovince);

let Pais2: Pais = new Pais(258, "chad");
let Pais3: Pais = new Pais(19, "uruguay");
Paises.push(Pais2, Pais3, messicountry);

export class Controlador_pais {
  static async paises(_req: any, _res: any) {
    // testModel.deleteOne({"_id": req.params.id})
    // testModel.updateOne({"nombre": "mbappe"}, {"trolo": true})
    // const a = testModel.findOneAndUpdate({"nombre": "mbappe"}, {"trolo": true})
    // const pais = await paisModel.find({ "_id": req.params.id })
    // const array_ids = pais.provicias
    // array_ids.forEach( id => { const provincias_del_pais = await provinciaModel.find({"_id": id})} )

    _res.send(await paisModel.find());
  }
  static async pais_x_id_get(_req: any, _res: any) {
    _res.send(await paisModel.find({ "_id": _req.params.id }));
    //const pais = await paisModel.findById({ "_id": _req.params.id }).exec()
    //  const array_ids = pais?.provincias || []
    // array_ids.forEach( id => { const provincias_del_pais = await provinciaModel.find({"_id": id})} )
  }
  static async pais_x_id_put(_req: any, _res: any) {
    {
      const pais = await paisModel.findOneAndReplace({_id: _req.params.id}, _req.body)
      _res.send(pais)
    }
  }

  static async pais_x_id_patch(_req: any, _res: any) {
    const pais = await paisModel.findOneAndUpdate({_id:_req.params.id},_req.body) 
  }

  static async pais_x_id_delete(_req: any, _res: any) {
   const pais = await paisModel.deleteOne({_id: _req.params.id})
  }
  static async pais_x_id_post(_req: any, _res: any) {
    const pais = await paisModel.create(_req.body);
    const pais_aux = await pais.save();
    _res.status(201).send(pais_aux);
  }

  static pais_x_id_cant_de_lluvias(_req: any, _res: any) {
    paisModel.findById({ "_id": _req.params.id }).exec().then((pais)=>{
      provinciaModel.find({ "_id": pais!.provincias}).exec().then((provincias)=>{
        console.log(provincias.length) 
        const prov=provincias.flatMap((v)=> v.lluvias)
        lluviaModel.find({ "_id": prov}).exec().then((lluvias2)=>{
          const cant_de_lluvias =lluvias2.map(ll=> ll.mm_de_agua).reduce((sum, current)=> sum.valueOf() + current.valueOf(),0)
          //this.getlluvias().map(l => l.getmm_de_agua())
          //.reduce((sum, current) => sum + current, 0);
          // .reduce((sum, current) => sum + current, 0)
          console.log(cant_de_lluvias)
        });
      })  

    })
    
   

    /*let pais: Pais | undefined;
   
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
    }*/
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