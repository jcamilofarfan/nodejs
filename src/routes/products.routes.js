import {Router} from "express"
const router = Router()

/**
 * @swagger
 * tags:
 *  name: Products
 *  description: CRUD products
 */

import * as productCtrl from "../controllers/products.controller"
import { authJwt } from "../middlewares";

/**
 * @swagger
 * /api/products/:
 *  post:
 *    summary: Creacion de productos para usuarios autenticados
 *    tags: [Products]
 */
router.post("/", [authJwt.verifyToken, authJwt.isModerator], productCtrl.createProduct);
/**
 * @swagger
 * /api/products/:
 *  get:
 *    summary: Obtencion de productos en lista
 *    tags: [Products]
 */
router.get("/", productCtrl.getProducts);
/**
 * @swagger
 * /api/products/{productId}:
 *  get:
 *    summary: Obtiene producto especifico de acuerdo al Id indicado
 *    tags: [Products]
 */
router.get("/:productId", productCtrl.getProductById);
/**
 * @swagger
 * /api/products/{productId}:
 *  put:
 *    summary: Actualzia producto especifico de acuerdo al Id indicado para usuarios autenticados
 *    tags: [Products]
 */
router.put('/:productId', [authJwt.verifyToken, authJwt.isModerator], productCtrl.updateProductById);
/**
 * @swagger
 * /api/products/{productId}:
 *  delete:
 *    summary: Elimina producto especifico de acuerdo al Id indicado para usuarios autenticados
 *    tags: [Products]
 */
router.delete('/:productId', [authJwt.verifyToken, authJwt.isModerator], productCtrl.deleteProductById);

export default router;