
import * as passportLocal from "passport-local";
import { IUserService } from "../service/interface/userService";
import { UserService } from "../service/userService";
import { UserRepository } from "../repository/userRepository";
import { UserVO } from "../service/vo/userVO";

/**
 * @class Auth. Responsible to start authentication following a defined passport strategy
 */
export class Auth {

    private userService: IUserService;

    constructor(){
        this.userService = new UserService(new UserRepository());
    }
    
    /**
     * @method getLocalAuthenticationStrategy Setup passport rule for authentication
     * @returns The passport strategy
     */
    public getLocalAuthenticationStrategy(): passportLocal.Strategy {
        return new passportLocal.Strategy({
            usernameField: 'username',
            passwordField: 'password'
        },(username, password, done) => this.findUserByUsernamePassword(username, password, done));
    }

    /**
     * @method serializeUser User serialization method
     * @param user User object to serialize
     * @param done Notification for terminaison
     */
    public serializeUser(user, done): void {
        done(null, user.username);
    }

    /**
     * @method deserializeUser User deserialized to retrieve informations
     * @param username The user identification (username)
     * @param done Notification for terminaison
     * @returns The user informations
     */
    public async deserializeUser(username, done): Promise<any> {
        let userVO: UserVO = await this.userService.findByUsername(username);
        done(null, userVO);
    }

    private async findUserByUsernamePassword(username, password, done): Promise<any>{
        let userVO: UserVO = await this.userService.findByUsernamePassword(username, password);
        if(!userVO){
            return done(null, false, { message: 'Incorrect credentials.' });
        }
        return done(null, userVO);
    }
}