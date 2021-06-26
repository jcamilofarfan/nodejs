import {Schema, model} from "Mongoose";

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true
        },
        email: {
            type: String,
            unique = true
        },
        password:{
            type: String,
            required: true,
        },
        roles: [
            {
                ref: "Role",
                type: Schema.type.ObjectId,
            },
        ],
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export default userSchema;