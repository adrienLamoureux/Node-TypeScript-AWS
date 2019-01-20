import { UserVO } from "../vo/userVO";

/**
 * @interface ISessionService Responsible for the logic related to the session management
 */
export interface ISessionService {
    /**
     * @method login Log the user if credentials are correct
     * @param req The express request with credentials
     * @returns A promise containing the user or an error message
     */
    login(req: any): Promise<any>;

    /**
     * @method logout Logout the logged user
     * @param req The express request object containing the logged user
     */
    logout(req: any);
}