import User from "../models/User";
// import Role from "../models/Role";

export const createUser = (req, res)=>{
    res.json("Creating User")
}

export const listUser= async(req, res)=>{
    const user = await User.find().populate("roles");
    res.json(user)
}