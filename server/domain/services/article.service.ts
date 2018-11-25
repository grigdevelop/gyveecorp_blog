import IArticleService from "../../core/services/iArticle.service";
import IArticleRepository from "../../core/repos/iArticle.repo";
import { validateArticle } from "../validation/entity.validator";
import { toValidInt } from "../validation/validators";
import { IAuthService } from "../../core/services/iAuth.service";
import { Article } from "../entities";

class ArticleService implements IArticleService {
       
   
    constructor(private readonly articleRepository: IArticleRepository, 
        private readonly authService: IAuthService){

    }

    getArticles(): Promise<Article[]> {
        return this.articleRepository.getArticles();
    }

    getUserArticles():Promise<Article[]>{

        this.authService.checkAuthorized();

        return this.articleRepository.getAuthorArticles(this.authService.getAuthorized().id);
    }
    
    async createArticle(article: Article): Promise<Article> {        
        await this.validateArticleForAuthor(article);  

        return this.articleRepository.createArticle(article);       
    }

    async updateArticle(article: Article): Promise<Article> {
        await this.validateArticleForAuthor(article);

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
        this.authService.checkAuthorized();
        
        if(!article.id){
            throw new Error('id is required for deleting article.');
        }

        let foundArticle = await this.articleRepository.getArticleById(article.id);
        if(!foundArticle){
            throw new Error(`Article with id '${article.id}' not found.`);
        }

        if(foundArticle.authorId != this.authService.getAuthorized().id){
            throw new Error("Access denied.");
        }

        await this.articleRepository.deleteArticleById(article.id);
    }

    private async validateArticleForAuthor(article: Article): Promise<Article>{
        this.authService.checkAuthorized();
        let author = this.authService.getAuthorized();
    
        article.authorId = author.id;
        let validation = await validateArticle(article);
        validation.throwIfInvalid();

        return article;
    }


}

export default ArticleService;