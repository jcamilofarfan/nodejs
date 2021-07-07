import { Schema, model } from "mongoose";

export const STATUS = ["unverified", "verified", "active", "inactive","eliminated"]

const statusSchema = new Schema ({
    name: String
},{
    versionKey: false
})

export default model("Status", statusSchema)