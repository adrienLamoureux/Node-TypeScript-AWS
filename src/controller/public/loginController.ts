import * as express from "express";
import { inject } from "inversify";
import { controller, httpPost } from "inversify-express-utils";
import { Config } from "../../config/config";
import { UserVO } from "../../service/vo/userVO";
import { ISessionService } from "../../service/interface/sessionService";

/**
 * @class LoginController. Manage the endpoints related to Login
 */
@controller(Config.getVersionPublic() + "/login")
export class LoginController {

    constructor(
        @inject("ISessionService") private sessionService: ISessionService) {
    }

    /**
     * @method login POST endpoint. Credentials (username, password) have to be provided in the body request
     * Sign-in the user in a dedicated session
     */
    @httpPost("/")
    private async login(req: any, res: express.Response, next: express.NextFunction): Promise<any> {
        let userVO: UserVO = null;
        req.user && req.user.getUsername() === req.body.username ? userVO = req.user : userVO = await this.sessionService.login(req);
        return res.status(200).send({
            username: userVO.getUsername(),
            msg: "Connected",
            state: true
        });
    }
}