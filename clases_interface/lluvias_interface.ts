import { modelOptions, getModelForClass, prop } from "@typegoose/typegoose";


@modelOptions({
    "schemaOptions": { "collection": "lluvias" , timestamps: false}
})

class LLuvia{

    @prop()
    mm_de_agua!: Number

    @prop()
    fecha!: Date


}

export const lluviaModel = getModelForClass(LLuvia)