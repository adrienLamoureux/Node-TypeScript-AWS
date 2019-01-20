import { UserVO } from "../vo/userVO";

export class UserConverter {

    public static convertModelToVO(userModel: any): UserVO {  
        if(!userModel){
            return null;
        }
        return new UserVO(userModel.username, userModel.password);
    }

    public static convertVOToModel(userVO: UserVO): any {
        if(!userVO){
            return null;
        }
       return {
            username: userVO.getUsername(),
            password: userVO.getPassword()
        };
    }
}