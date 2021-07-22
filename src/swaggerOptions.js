import pkg from "../package.json"
// /**
//  * @swagger
//  * components:
//  *  schemas:
//  *    User Routes:
//  *      type: object
//  *      properties:
//  *        id:
//  *          type: string
//  *          description: the auto-generated id of task
//  *        title:
//  *          type: string
//  *          description: the task title
//  *        description:
//  *          type: string
//  *          description: the task description
//  */
export const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Sistemas Contables",
            version: pkg.version,
            description: pkg.description,
        },
        // servers: [
        //     {
        //         url: "http://localhost:4000",
        //     },
        // ],
    },
    apis: ["./src/routes/*.js", "./src/swaggerOptions.js"],
};
