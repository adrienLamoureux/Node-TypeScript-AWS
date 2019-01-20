import * as express from "express";

 export class Common {

    /**
     * Middleware to add common headers to requests
     */
    public static setupGlobalHeaders(req: express.Request, res: express.Response, next: express.NextFunction): void {
        res.setHeader('Content-Type', 'application/json')
        next();
    }

    /**
     * Middleware to check if the user is already authenticated before going further
     */
    public static checkAuthentication(req: express.Request, res: express.Response, next: express.NextFunction) {
        req.isAuthenticated() ? next() : res.status(402).send({
            msg: "Please, authenticate first",
            state: false
        });
    }
 }