export class LLuvia{
    id_lluvia:Number
    mm_de_agua:number
    fecha:Date

    constructor(id:number ,cantidad_de_lluvia:number){
        this.id_lluvia=id
        this.mm_de_agua=cantidad_de_lluvia
        this.fecha=new Date()
    }

    setfecha(dia:Date):void{
        this.fecha=dia
    }

    setmm_de_agua(cantidad_de_lluvia:number): void{
        this.mm_de_agua=cantidad_de_lluvia
    }

    getid():Number{
        return this.id_lluvia
    }
    setid(id:Number): void{
        this.id_lluvia=id
    }

    getmm_de_agua():number{
        return this.mm_de_agua
    }
    getfecha():Date{
        return this.fecha
    }

}