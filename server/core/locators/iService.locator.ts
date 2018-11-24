import IArticleService from "../services/iArticle.service";

interface IServiceLocator{
    readonly articleService: IArticleService;
}

export default IServiceLocator;