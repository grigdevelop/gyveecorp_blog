import IArticleRepository from "../../core/repos/iArticle.repo";
import Article from "../entities/article";
import { mockData } from "../../test/setup"; // TODO: not good use anything test in prod

class ArticleSqlRepoistory implements IArticleRepository{

    constructor(private sqlDb: any){

    }

    getArticles(): Promise<Article[]> {
        return new Promise<Article[]>(resolve => {
            let articles: Article[] = mockData.articles;
            resolve(articles);
        });
    }

    createArticle(article: Article): Promise<Article> {
        throw new Error("Method not implemented.");
    }    
}

export default ArticleSqlRepoistory;