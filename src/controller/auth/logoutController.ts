import * as express from "express";
import { inject } from "inversify";
import { controller, httpGet } from "inversify-express-utils";
import { Config } from "../../config/config";
import { ISessionService } from "../../service/interface/sessionService";
import { Common } from "../../common/common";

/**
 * @class LogoutController. Manage the endpoints related to logout 
 */
@controller(Config.getVersionAuth() + "/logout")
export class LogoutController {
    
    constructor(@inject("ISessionService") private sessionService: ISessionService) {
    
    }

    /**
     * @method logout Must be logged to access it. Sign-out the connected user through the session
     */
    @httpGet("/", Common.checkAuthentication)
    private logout(req: any, res: express.Response, next: express.NextFunction): any {
        this.sessionService.logout(req);
        res.status(200).send({
            msg: "Disconnected",
            state: true
        });
    };
}