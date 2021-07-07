import express from "express"
import morgan from "morgan"
import cors from "cors";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";


import { createRoles, createStatus } from "./libs/initialSetup";
import { options } from "./swaggerOptions";

import cookieParser  from 'cookie-parser';
import pkg from "../package.json"

import productsRoutes from "./routes/products.routes"
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";

const app = express()
const specs = swaggerJSDoc(options);
app.use(cookieParser());
createRoles();
createStatus();
app.use(cors());
app.set("pkg", pkg);
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res)=>{
    res.json({
        name: app.get("pkg").name,
        author: app.get("pkg").author,
        description: app.get("pkg").description,
        version: app.get("pkg").version
    })
})
app.use("/api/products",productsRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)
app.use("/docs", swaggerUI.serve, swaggerUI.setup(specs));
export default app
