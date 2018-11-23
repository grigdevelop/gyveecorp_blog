import Article from "../../domain/entities/article";

interface IArticleRepository {
    getArticles():Promise<Article[]>;
    createArticle(article: Article):Promise<Article>;
}

export default IArticleRepository;