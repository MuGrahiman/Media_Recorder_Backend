import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const generateToken = (id)=>{
 console.log(id)
    return jwt.sign({id},process.env.JWT_Key,{ expiresIn: '3d'})
}

export const verifyToken = (token) =>jwt.verify(token, process.env.JWT_Key );

 