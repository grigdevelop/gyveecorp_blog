import IArticleService from "../../core/services/iArticle.service";
import IArticleRepository from "../../core/repos/iArticle.repo";
import Article from "../entities/article";
import { validateArticle } from "../validation/entity.validator";
import { toValidInt } from "../validation/validators";

class ArticleService implements IArticleService {
       
   
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

    async getArticle(article: Article):Promise<Article>{
        
        if(!article.id){
            throw new Error('id is required for getting article.');
        }

        // because of GET request, it understand as a string
        article.id = toValidInt(article.id);
        if(!article.id){
            throw new Error('id must be number.');
        }

        let result = await this.articleRepository.getArticleById(article.id);
        if(!result){
            throw new Error(`Article with id '${article.id}' not found.`);
        }

        return result;
    }

    async deleteArticle(article: Article): Promise<void> {
        
        if(!article.id){
            throw new Error('id is required for deleting article.');
        }

        let foundArticle = await this.articleRepository.getArticleById(article.id);
        if(!foundArticle){
            throw new Error(`Article with id '${article.id}' not found.`);
        }

        await this.articleRepository.deleteArticleById(article.id);
    }


}

export default ArticleService;