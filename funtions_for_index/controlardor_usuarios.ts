import { AnyArray, Schema } from "mongoose";
import { LLuvia } from "../Lluvia";
import { Pais } from "../Pais";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Provincia } from "../Provincia";
import { lluviaModel } from "../clases_interface/lluvias_interface";
import { paisModel } from "../clases_interface/paises_interface";
import { provinciaModel } from "../clases_interface/provincias_interface";
import { UserModel } from "../clases_interface/usuarios_interface";

/*
Para proteger las rutas que requieren autenticación,
 puedes crear un middleware que verifique el token JWT en la solicitud antes de permitir el acceso a la ruta protegida:
import jwt from 'jsonwebtoken';
import express from 'express';
import UserModel from '../models/User';

const router = express.Router();

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message:
*/
const clave = "tobato";

export class controlador_usuarios {
  static async comprobacion_de_usuario(username: String, password: string) {
    const user = await UserModel.findOne(username);
    if (!user) {
      return false;
    }

    const isvalid = await bcrypt.compare(password, user.passw);
    if (!isvalid) {
      return false;
    }

    const token = jwt.sign({ _id: user._id }, clave);

    return token;
  }

  static comprobacion_de_usuario_p(username: string, password: string) {
    return new Promise((resolve, reject) => {
      UserModel.findOne({ nombre: username }).then((user) => {
        if (!user) {
          reject();
        }
        bcrypt.compare(password, user!.passw).then((isvalid) => {
          if (!isvalid) {
            reject();
          }

          const token = jwt.sign({ _id: user!._id }, clave);

          return resolve(token);
        });
      });
    });
  }

  static registrar_usuario(username: string, password: string) {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, 10).then((password) => {
        UserModel.create({
          nombre: username,
          passw: password,
        }).then((User) => {
          User.save().then(() => {
            resolve(User);
          });
        });
      });
    });
  }

  
}
