import IArticleRepository from "../../core/repos/iArticle.repo";
import { mockData } from "../../test/setup"; // TODO: not good use anything test in prod
import { Article } from "../entities";

class ArticleSqlRepoistory implements IArticleRepository{
        
    constructor(private sqlDb: any){

    }

    getArticles(): Promise<Article[]> {
        return new Promise<Article[]>(resolve => {
            let articles: Article[] = mockData.articles;
            resolve(articles);
        });
    }

    getAuthorArticles(authorId: number): Promise<Article[]> {
        throw new Error("Method not implemented.");
    }   

    createArticle(article: Article): Promise<Article> {
        throw new Error("Method not implemented.");
    }    

    updateArticle(article: Article): Promise<Article> {
        throw new Error("Method not implemented.");
    }

    getArticleById(id: number): Promise<Article> {
        throw new Error("Method not implemented.");
    }

    deleteArticleById(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }   

}

export default ArticleSqlRepoistory;