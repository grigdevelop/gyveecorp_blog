import { Article } from "../../domain/entities";

interface IArticleService {
    
    getArticles():Promise<Article[]>;

    createArticle(article: Article):Promise<Article>;

    updateArticle(article: Article):Promise<Article>;

    getArticle(article: Article):Promise<Article>;

    deleteArticle(article: Article):Promise<void>;
}

export default IArticleService;