import Article from "../../domain/entities/article";

interface IArticleService {
    getArticles():Promise<Article[]>;

    createArticle(article: Article):Promise<Article>;

    updateArticle(article: Article):Promise<Article>;
}

export default IArticleService;