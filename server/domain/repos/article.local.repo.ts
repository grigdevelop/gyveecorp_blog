import Article from "../entities/article";
import IArticleRepository from "../../core/repos/iArticle.repo";
import { LocalDb } from "../providers/local.database.provider";

class ArticleLocalRepository implements IArticleRepository{

    constructor(private localDb: LocalDb){

    }

    getArticles(): Promise<Article[]> {
        return new Promise<Article[]>(resolve => {
            let articles = this.localDb.get('articles').value();
            resolve(articles);
        });
    }

    createArticle(article: Article): Promise<Article> {
        throw new Error("Method not implemented.");
    }
}

export default ArticleLocalRepository;