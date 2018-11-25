import { Article } from "../../domain/entities";

interface IArticleRepository {

    getArticles():Promise<Article[]>;

    getAuthorArticles(authorId: number): Promise<Article[]>;

    createArticle(article: Article):Promise<Article>;

    updateArticle(article: Article):Promise<Article>;

    getArticleById(id: number):Promise<Article>;

    deleteArticleById(id: number):Promise<void>;
}

export default IArticleRepository;