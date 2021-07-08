import {Router} from "express"
const router = Router()

/**
 * @swagger
 * tags:
 *  name: Sign
 *  description: SignUp y SignIn
 */

import * as authCtrl from "../controllers/auth.controller";
import { verifySignup } from "../middlewares";


/**
 * @swagger
 * /api/auth/signup:
 *  post:
 *    summary: Registro de usuario desde Formulario sin proteccion
 *    tags: [Sign]
 */
router.post(
    "/signup",
    [verifySignup.checkDuplicateUsernameOrEmail, verifySignup.checkRolesExisted],
    authCtrl.signUp
);
/**
 * @swagger
 * /api/auth/signin:
 *  post:
 *    summary: Inicio de sesion desde Formulario sin proteccion
 *    tags: [Sign]
 */
router.post("/signin", authCtrl.signIn)

/**
 * @swagger
 * /api/auth/verify/{token}:
 *  get:
 *      summary: Verificacion de correo con token
 *      tags: [Sign]
 */
router.get("/verify/:token", authCtrl.confirm)

export default router;