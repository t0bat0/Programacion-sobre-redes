


import jwt from "jsonwebtoken";


const clave = "tobato";

export class middleware{


    static verificar_token(_req: any, _res: any, next:any) {
        const token = _req.headers.authorization;
    
        if (!token) {
          return _res
            .status(401)
            .send({ message: "Unauthorized: No token provided." });
        }
    
        try {
          const decoded = jwt.verify(token, clave);
          _req.usuario = decoded;
          console.log("verificación exitosa :D");
          next()
        } catch (err) {
          return _res.status(401).send({ message: "Unauthorized: Invalid token." });
        }
      }

}