import User from "../models/User";
import Role from "../models/Role";
import Status from "../models/Status";
import config from "../config";

import jwt from "jsonwebtoken";
import { uuidv4 } from "uuid";

export const signUp = async (req, res)=>{
    const {username, email, password, roles, status}= req.body;
    const newUser = new User ({
        username,
        email,
        password: await User.encryptPassword(password),
        code: await uuidv4()
    });
    if (roles){
        const foundRoles = await Role.find({name: {$in: roles}})
        newUser.roles= foundRoles.map(role=>role._id)
    }else{
        const role = await Role.findOne({name: "user"})
        newUser.roles = [role._id];
    }
    if(status){
        const foundStatus= await Status.find({name: {$in: status}})
        newUser.status= foundStatus.map(status=>status._id)
    }else{
        const status= await Status.findOne({name: "unverified"})
        newUser.status= status._id;
    }

    const savedUser= await newUser.save();
    console.log(savedUser);
    const token =jwt.sign({email: savedUser.email, code: savedUser.code}, config.SECRET,{
        expiresIn: 86400
    })
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