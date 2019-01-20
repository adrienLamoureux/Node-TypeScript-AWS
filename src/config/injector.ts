import "reflect-metadata";
import { Container } from 'inversify';

import { IUserRepository } from "../repository/interface/userRepository";
import { UserRepository } from "../repository/userRepository";
import { LoginController } from "../controller/public/loginController";
import { LogoutController } from "../controller/auth/logoutController";
import { IUserService } from "../service/interface/userService";
import { UserService } from "../service/userService";
import { RegisterController } from "../controller/public/registerController";
import { SessionService } from "../service/sessionService";
import { ISessionService } from "../service/interface/sessionService";

/**
 * @class Injector. Manage the Dependencies Injection of the server
 */
export class Injector {

    /**
     * @method getContainer Get the Container object configured with the choosen injection
     * @returns The container object
     */
    public static getContainer(): Container {
        var container = new Container();

        container = Injector.injectRepositories(container);
        container = Injector.injectServices(container);
        container = Injector.injectControllers(container);
    
        return container;  
    }

    private static injectControllers(container: Container): Container {
        container.bind<LoginController>('LoginController').to(LoginController);
        container.bind<LogoutController>('LogoutController').to(LogoutController);
        container.bind<RegisterController>('RegisterController').to(RegisterController);
        return container;
    }

    private static injectServices(container: Container): Container {
        container.bind<IUserService>('IUserService').to(UserService);
        container.bind<ISessionService>('ISessionService').to(SessionService);
        return container;
    }

    private static injectRepositories(container: Container): Container {
        container.bind<IUserRepository>('IUserRepository').to(UserRepository);
        return container;
    }

}