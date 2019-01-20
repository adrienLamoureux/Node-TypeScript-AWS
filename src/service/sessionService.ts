import { injectable, inject } from "inversify";
import "reflect-metadata";
import { ISessionService } from "./interface/sessionService";
import * as passport from "passport";
import { UserVO } from "./vo/userVO";
import { UserConverter } from "./converter/userConverter";


@injectable()
export class SessionService implements ISessionService {
    
    public async login(req: any): Promise<any>{
        return new Promise((resolve, reject) => { 
            passport.authenticate('local', {
                session: true, 
                failureFlash: true 
            }, function(err, user, info) {
                if (err) {
                    return reject(err);
                }
                if (!user) {
                    return reject(info.message);
                }
                req.login(user, function(err){
                    if(err){
                        reject(err);
                    }
                    req.user = user;
                    req.session.user = req.user;
                    req.session.sessionID = req.sessionID;
                    req.session.save();
                    return resolve(UserConverter.convertModelToVO(user));
                });
            })(req);
        });
    }
    
    public logout(req: any) {
        req.logout();
        req.session.destroy();
    }
}