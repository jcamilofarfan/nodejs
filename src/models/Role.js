import { Schema, model } from "mongoose";

export const ROLES = [
    "admin",
    "dev",
    "adminCompany",
    "acountan",
    "accounting assistant",
    "auditor",
    "analyst",
    "rrhh",
    "employee",
    "seller",
    "buyer",
    "candidate",
    "user"
]

const roleSchema = new Schema ({
    name: String
},{
    versionKey: false
})

export default model("Role", roleSchema)