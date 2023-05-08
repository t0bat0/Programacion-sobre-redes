import { modelOptions, getModelForClass, prop } from "@typegoose/typegoose";


@modelOptions({
    "schemaOptions": { "collection": "Usuarios" , timestamps: false}
})

class Usuario{

    @prop()
    nombre!: string

    @prop()
    contraseña!: string


}

export const UserModel = getModelForClass(Usuario)



/* import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
 */