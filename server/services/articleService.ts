import { Article } from "../data/entities/article";
import * as shortid from 'shortid';
import { IArticleService } from "./iArticleService";
import { ServiceBase } from "./serviceBase";

class ArticleService extends ServiceBase implements IArticleService{

    constructor(private db: any){        
        super();
    }

    createArticle(article: Article) : Promise<Article> {
        return this.asyncResult(() => {
            article.id = shortid.generate();
            this.db.get('articles').push(article).write();
            return article;
        });      
    }

    /**
     * Getting the articles
     * @param count Number of articles or 0 if all
     */
    getArticles(count: number = 0): Promise<Article[]>{
        return this.asyncResult(() => {
            let articlesQuery = this.db.get('articles');
            if(count === 0){
                return articlesQuery.value();
            }            
            return articlesQuery.take(count).value();
        });      
    }
}

export { ArticleService };