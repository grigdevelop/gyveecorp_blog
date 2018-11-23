import IArticleService from "../../core/services/iArticle.service";
import IArticleRepository from "../../core/repos/iArticle.repo";
import Article from "../entities/article";

class ArticleService implements IArticleService{
   
    constructor(private readonly articleRepository: IArticleRepository){

    }

    getArticles(): Promise<Article[]> {
        return this.articleRepository.getArticles();
    }
    createArticle(article: Article): Promise<Article> {
        throw new Error("Method not implemented.");
    }


}

export default ArticleService;