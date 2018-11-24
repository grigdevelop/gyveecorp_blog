import Article from "../domain/entities/article";
import IArticleService from "../core/services/iArticle.service";

class ArticleController {
    constructor(private readonly articleService: IArticleService){

    }

    getArticles():Promise<Article[]>{
        return this.articleService.getArticles();
    }

    createArticle(article: Article):Promise<Article>{
        return this.articleService.createArticle(article);
    }
}

export default ArticleController;