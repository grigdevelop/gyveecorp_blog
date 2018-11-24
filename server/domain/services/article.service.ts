import IArticleService from "../../core/services/iArticle.service";
import IArticleRepository from "../../core/repos/iArticle.repo";
import Article from "../entities/article";
import { validateArticle } from "../validation/entity.validator";
import { ValidationError } from "../../core/http/validation.error";

class ArticleService implements IArticleService{
   
   
    constructor(private readonly articleRepository: IArticleRepository){

    }

    getArticles(): Promise<Article[]> {
        return this.articleRepository.getArticles();
    }
    
    async createArticle(article: Article): Promise<Article> {
        let result = await validateArticle(article);
        result.throwIfInvalid();        

        return this.articleRepository.createArticle(article);       
    }

    async updateArticle(article: Article): Promise<Article> {
        let result = await validateArticle(article);
        result.throwIfInvalid();

        if(!this.articleRepository.getArticleById(article.id)){
            throw new Error(`Can't update article. Article with id '${article.id}' not found`);
        }

        return this.articleRepository.updateArticle(article);
    }


}

export default ArticleService;