import { Provincia } from "./Provincia"

export class Pais{
    id_pais:Number
    nombre: String
    provincias: Array<Provincia>

    constructor(id:number ,nombre:String){
        this.id_pais=id
        this.nombre = nombre
        this.provincias = new Array<Provincia>
    }
    setprovincias(provincias:Array<Provincia>): void{
        this.provincias=provincias
    }
    setNombre(nombre: String): void{
        this.nombre = nombre
    }
    setid(id:Number): void{
        this.id_pais=id
    }




    getid():Number{
        return this.id_pais 
    }

    getnombre():String{
        return this.nombre
    }
    getprovincias():Provincia[]{
        return this.provincias
    }
    



}