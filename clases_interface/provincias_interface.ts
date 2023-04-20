import { modelOptions, getModelForClass, prop } from "@typegoose/typegoose";
import mongoose, { ObjectId } from "mongoose";

@modelOptions({
    "schemaOptions": { "collection": "provincias" }
})

class Provincia{

    @prop()
    nombre!: string

    @prop()
    lluvias!: Array<ObjectId>



}

export const provinciaModel = getModelForClass(Provincia)