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
 * /signup:
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
 * /signin:
 *  post:
 *    summary: Inicio de sesion desde Formulario sin proteccion
 *    tags: [Sign]
 */
router.post("/signin", authCtrl.signIn)

export default router;