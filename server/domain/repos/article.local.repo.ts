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
        article.id = this.getId();

        return new Promise<Article>(resolve => {            

            this.localDb.get('articles')
                .push(article)
                .write();

            // resolve article with unique identifier if it's successfully saved
            resolve(article);
        });
    }

    updateArticle(article: Article): Promise<Article> {
        return new Promise<Article>(resolve => {

            this.localDb.get('articles')
                .find({id: article.id})
                .assign(article)
                .write();

            resolve(article);

        });
    }

    getArticleById(id: number): Promise<Article> {
        return new Promise<Article>(resolve => {
            
            let article = this.localDb.get('articles')
                .find({id: id})
                .value();

            resolve(article);
        });
    }

    private getId():number{

        // update cache
        this.localDb.read();

        const articleIdList = this.localDb.get('articles').value().map((article: Article) => article.id);
        let max = Math.max(...articleIdList);
        return max + 1;
    }
}

export default ArticleLocalRepository;