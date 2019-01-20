import { UserVO } from "../vo/userVO";

/**
 * @interface IUserService Responsible for the logic related to the user
 */
export interface IUserService {
    /**
     * @method register Registration logic. Based on the user username
     * @param userVO An user object
     * @returns A boolean promise to know if the registration was successful
     */
    register(userVO: UserVO): Promise<boolean>;

    /**
     * @method 
     * @param username 
     */
    findByUsername(username: string): Promise<UserVO>;

    findByUsernamePassword(username: string, password: string): Promise<UserVO>;
}