import {Router} from "express"
const router = Router()

/**
 * @swagger
 * tags:
 *  name: Users
 *  description: CRUD users
 */


import * as userCtrl from "../controllers/user.controller";
import { authJwt, verifySignup } from "../middlewares";

/**
 * @swagger
 * /api/user/:
 *  post:
 *    summary: Crea usuarios siempre y cuando sea usuario admnistrador
 *    tags: [Users]
 */

router.post("/", [
    authJwt.verifyToken,
    authJwt.isAdmin,
    verifySignup.checkRolesExisted
], userCtrl.createUser);

/**
 * @swagger
 * /api/user/:
 *  get:
 *    summary: Obtiene usuarios siempre y cuando sea usuario admnistrador
 *    tags: [Users]
 */
router.get("/", [
    authJwt.verifyToken,
    authJwt.isAdmin
], userCtrl.listUser);

export default router;