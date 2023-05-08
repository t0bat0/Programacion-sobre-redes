import { AnyArray, Schema } from "mongoose";
import { LLuvia } from "../Lluvia";
import { Pais } from "../Pais";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
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

u


export class controlador_usuarios{
    static async comprobacion_de_usuario(_req: any,_res: any){

        const { username, password } = _req.body;

   UserModel.findOne({ username }).then((user=>{
    if (!user) {
    return _res.status(401).json({ message: 'Invalid username or password' });
  }

  bcrypt.compare(password, user.contraseña).then((isvalid)=>{ 
    if (!isvalid) {
    return _res.status(401).json({ message: 'Invalid username or password' });
  }})
  process.env

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET: );

  return _res.status(200).json({ token });

}));
  

  

 



    }
}