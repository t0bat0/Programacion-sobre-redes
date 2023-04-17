import { LLuvia } from "./Lluvia"

export class Provincia {
    id_provincia:Number
    nombre: String
    lluvias : Array<LLuvia>

    constructor(id:number ,nombre1: string){
        this.id_provincia=id
        this.nombre = nombre1
        this.lluvias = new Array<LLuvia>
    }

    setNombre(nombre: String): void{
        this.nombre = nombre
    }

    setlluvias(lluvias:Array<LLuvia>): void{
        this.lluvias=lluvias
    }

    setid(id:Number): void{
        this.id_provincia=id
    }
    getid():Number{
        return this.id_provincia
    }

    getnombre():String{
        return this.nombre
    }

    getlluvias():LLuvia[]{
        return this.lluvias
    }

    getmmlluviastotales():number{
        let messi =[]
        messi =this.getlluvias().map(l => l.getmm_de_agua())
        console.log(messi)
        
        console.log("mesiisisisisisisisisi "+ Math.max(...messi))
        
        return this.getlluvias().map(l => l.getmm_de_agua())
                        .reduce((sum, current) => sum + current, 0);
    }
    getprovinciaconmayorlluvia():number{
        return Math.max(...this.getlluvias().map(l => l.getmm_de_agua()))
                        
    }

    getmmlluviasmensuales(mes:number):number{
        const mes_de_las_lluvias =this.getlluvias().filter(m => mes == m.getfecha().getMonth())
        
        return mes_de_las_lluvias.map(l => l.getmm_de_agua())
                        .reduce((sum, current) => sum + current, 0)/mes_de_las_lluvias.length;
    }
}