import Article from "../../domain/entities/article";

interface IArticleRepository {

    getArticles():Promise<Article[]>;

    createArticle(article: Article):Promise<Article>;

    updateArticle(article: Article):Promise<Article>;

    getArticleById(id: number):Promise<Article>;
}

export default IArticleRepository;