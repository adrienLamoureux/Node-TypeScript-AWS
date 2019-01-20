import * as express from "express";
import { inject } from "inversify";
import { controller, httpPost } from "inversify-express-utils";
import { Config } from "../../config/config";
import { IUserService } from "../../service/interface/userService";
import { UserVO } from "../../service/vo/userVO";

/**
 * @class RegisterController. Manage the endpoints related to registration
 */
@controller(Config.getVersionPublic() + "/register")
export class RegisterController {
    
    constructor(@inject("IUserService") private userService: IUserService){
    
    }

    /**
     * @method register POST endpoint. Register the user based on the body request informations 
     */
    @httpPost("")
    private async register(req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> {
        let registered: boolean = await this.userService.register(new UserVO(req.body.username, req.body.password));
        return registered ? {
            username: req.body.username,
            msg: "Successfully registered",
            state: registered
        } : {
            username: req.body.username,
            msg: "Registration failed",
            state: registered
        };
    }
}