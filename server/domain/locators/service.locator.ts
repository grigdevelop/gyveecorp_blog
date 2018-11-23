import IServiceLocator from "../../core/locators/iService.locator";
import IArticleService from "../../core/services/iArticle.service";
import IRepositoryLocator from "../../core/locators/iRepo.locator";
import ArticleService from "../services/article.service";

class ServiceLocator implements IServiceLocator{

    public readonly articleService: IArticleService;

    constructor(repositoryLocator: IRepositoryLocator){
        this.articleService = new ArticleService(repositoryLocator.articleRepository);
    }
}

export default ServiceLocator;