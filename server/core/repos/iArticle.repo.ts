import Article from "../../domain/entities/article";

interface IArticleRepository {

    getArticles():Promise<Article[]>;

    createArticle(article: Article):Promise<Article>;

    updateArticle(article: Article):Promise<Article>;

    getArticleById(id: number):Promise<Article>;

    deleteArticleById(id: number):Promise<void>;
}

export default IArticleRepository;