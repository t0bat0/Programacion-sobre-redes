import { modelOptions, getModelForClass, prop } from "@typegoose/typegoose";
@modelOptions({
    "schemaOptions": { "collection": "Paises" }
})

class Pais{

    @prop()
    nombre!: string

    @prop()
    provincias!: Array<Number>



}

export const paisModel = getModelForClass(Pais)