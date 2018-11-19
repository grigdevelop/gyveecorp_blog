import { IArticleService } from "./iArticleService";
import { Article } from "../data/entities/article";

class ArticleSqlService implements IArticleService {

    constructor(private db: any){

    }

    createArticle(article: Article): Promise<Article> {
        throw new Error("Method not implemented.");
    }
    getArticles(count: number): Promise<Article[]> {
        throw new Error("Method not implemented.");
    }    
}

export {ArticleSqlService};