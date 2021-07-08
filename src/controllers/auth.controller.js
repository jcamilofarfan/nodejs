import User from "../models/User";
import Role from "../models/Role";
import Status from "../models/Status";
import config from "../config";

import jwt from "jsonwebtoken";
const { v4: uuidv4 } = require('uuid');
import { sendEmail, getTemplate } from "../config/mail.config";

export const signUp = async (req, res)=>{
    //obtiene datos del req.body
    const {username, email, password, roles, status}= req.body;
    //crea el objeto newUser con base al modelo models/User.js
    const newUser = new User ({
        username,
        email,
        password: await User.encryptPassword(password),
        code: await uuidv4()
    });
    //valida roles enviados en la peticion o asigna el rol por default "User", esto con base al models/Role.js
    if (roles){
        const foundRoles = await Role.find({name: {$in: roles}})
        newUser.roles= foundRoles.map(role=>role._id)
    }else{
        const role = await Role.findOne({name: "user"})
        newUser.roles = [role._id];
    }
    //valida status enviados en la peticion o asigna el status por default "unverified", esto con base al models/Status.js
    if(status){
        const foundStatus= await Status.find({name: {$in: status}})
        newUser.status= foundStatus.map(status=>status._id)
    }else{
        const status= await Status.findOne({name: "unverified"})
        newUser.status= status._id;
    }
    //guarda el usuario en la base de datos y lo guarda en una constante
    const savedUser= await newUser.save();
    console.log(savedUser);
    //genera token para verificacion de email
    const token =jwt.sign({email: savedUser.email, code: savedUser.code}, config.SECRET,{
        expiresIn: 86400
    })
    //asigna template de email
    const template = getTemplate(savedUser.username, token)
    //envia email desde nodemailer
    await sendEmail(savedUser.email, 'Verficacion de correo SisContables', template);

    res.status(200).json({token})
}
export const signIn = async (req, res)=>{
    const userFound =await User.findOne({email: req.body.email}).populate("roles");

    if(!userFound) return res.status(400).json({message:"User not Found"})

    const matchPassword = await User.comparePassword(req.body.password, userFound.password)
    if(!matchPassword) return res.status(401).json({token: null, message: "Invalid password"})
    console.log(userFound)
    const token = jwt.sign({id: userFound._id}, config.SECRET,{
        expiresIn: 86400
    })

    const cookie_name= "co_ss";
    res.cookie(cookie_name , {token})
    res.json({token})
}
export const confirm = async (req, res)=>{
    try {
        const token = req.params.token;
        if(!token) return res.status(403).json({message: "No token provided"})
        const decoded= jwt.verify(token, config.SECRET)
        const code= decoded.code
        const email =decoded.email
        const userFound = await User.findOne({email}) || null;
        if(userFound === null) {
            return res.json({
                message: "User no found"
            });
        }
        if(code !==userFound.code){
            return res.json({
                message: "Code no found"
            });
        }
        const userFoundStatus = await Status.findOne({_id: {$in: userFound.status}})
        if(userFoundStatus.name !== "unverified"){
            return res.json({message: "the user was already verified"})
        }
        const status= await Status.findOne({name: "verified"})
        userFound.status= status._id;

        await userFound.save();

        res.json({message: "user verified successfully"})
    } catch (error) {
        return res.status(401).json({message: "Unauthorized"})
    }
}