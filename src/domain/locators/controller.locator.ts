import { IServiceLocator } from "../../core/locators";
import { ArticleController, AuthController } from "../../controllers";
import { IAuthService } from "./../../core/services/iAuth.service";

class ControllerLocator {

    public readonly articleController: ArticleController;
    public readonly authController: AuthController;

    public readonly authService: IAuthService;

    constructor(serviceLocator: IServiceLocator){
        this.authService = serviceLocator.authService;

        this.articleController = new ArticleController(serviceLocator.articleService);
        this.authController = new AuthController(serviceLocator.userService);
    }

}

export default ControllerLocator;