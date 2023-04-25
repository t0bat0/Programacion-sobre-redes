import { modelOptions, getModelForClass, prop } from "@typegoose/typegoose";
import mongoose, { ObjectId } from "mongoose";

@modelOptions({
    "schemaOptions": { "collection": "paises" }
})

class Pais{

    @prop()
    nombre!: string

    @prop()
    provincias!: Array<ObjectId>



}

export const paisModel = getModelForClass(Pais)