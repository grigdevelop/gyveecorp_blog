import IArticleService from "../services/iArticle.service";
import { IUserService } from "../services";
import { IAuthService } from "../services/iAuth.service";

interface IServiceLocator{
    readonly articleService: IArticleService;
    readonly userService: IUserService;
    readonly authService: IAuthService;
}

export default IServiceLocator;