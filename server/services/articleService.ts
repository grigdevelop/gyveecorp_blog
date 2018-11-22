import { Article } from "../data/entities/article";
import * as shortid from 'shortid';
import { IArticleService } from "./iArticleService";
import { ServiceBase } from "./serviceBase";
import { LowdbSync } from "lowdb";

class ArticleService extends ServiceBase implements IArticleService{

    constructor(private localDb: LowdbSync<any>){        
        super();
    }

    createArticle(article: Article) : Promise<Article> {
        return this.asyncResult(() => {
            this.localDb.read();

            article.id = shortid.generate();
            this.localDb.get('articles').push(article).write();
            return article;
        });      
    }

    /**
     * Getting the articles
     * @param count Number of articles or 0 if all
     */
    getArticles(count: number = 0): Promise<Article[]>{
        return this.asyncResult(() => {
            this.localDb.read();

            let articlesQuery = this.localDb.get('articles');
            if(count === 0){
                return articlesQuery.value();
            }            
            return articlesQuery.take(count).value();
        });      
    }
}

export { ArticleService };