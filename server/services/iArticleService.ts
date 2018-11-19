import { Article } from "../data/entities/article";

interface IArticleService{
    createArticle(article: Article) : Promise<Article>;
    getArticles(count?: number): Promise<Article[]>;
}

export {IArticleService};