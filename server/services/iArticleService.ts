import { Article } from "../data/entities/article";

interface IArticleService{
    createArticle(article: Article) : Article;
    getArticles(count?: number): Article[];
}

export {IArticleService};