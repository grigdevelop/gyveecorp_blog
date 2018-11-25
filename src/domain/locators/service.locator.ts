import IServiceLocator from "../../core/locators/iService.locator";
import IArticleService from "../../core/services/iArticle.service";
import IRepositoryLocator from "../../core/locators/iRepo.locator";
import ArticleService from "../services/article.service";
import { IUserService } from "../../core/services";
import { UserService } from "../services";
import { IAuthService } from "../../core/services/iAuth.service";

class ServiceLocator implements IServiceLocator{

    public readonly articleService: IArticleService;
    public readonly userService: IUserService;
    public readonly authService: IAuthService;

    constructor(repositoryLocator: IRepositoryLocator){
        const userService = new UserService();
        this.userService = userService;
        this.authService = userService;

        this.articleService = new ArticleService(repositoryLocator.articleRepository, userService);

       
    }
}

export default ServiceLocator;