import { injectable, inject } from "inversify";
import "reflect-metadata";
import { IUserService } from "./interface/userService";
import { UserVO } from "./vo/userVO";
import { IUserRepository } from "../repository/interface/userRepository";
import { UserConverter } from "./converter/userConverter";

@injectable()
export class UserService implements IUserService {

    constructor(
        @inject("IUserRepository") private userRepository: IUserRepository){
    }

    public async findByUsername(username: string): Promise<UserVO> {
        if(!username){
            return null;
        }
        return UserConverter.convertModelToVO(await this.userRepository.get({username: username}));
    }

    public async findByUsernamePassword(username: string, password: string): Promise<UserVO> {
        if(!username){
            return null;
        }
        let userVO: UserVO = UserConverter.convertModelToVO(await this.userRepository.get({
            username: username
        }));
        if(!userVO){
            return null;
        }
        return userVO.getPassword() === password ? userVO : null;
    }

    public async register(userVO: UserVO): Promise<boolean> {
        if(!userVO){
            return false;
        }
        let existingUserVO: UserVO = UserConverter.convertModelToVO(await this.userRepository.get({
            username: userVO.getUsername()
        }));
        if(existingUserVO){
            return false;
        }
        await this.userRepository.post(UserConverter.convertVOToModel(userVO));
        return true;
    }
}