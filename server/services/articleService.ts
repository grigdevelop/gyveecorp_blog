import { Article } from "../data/entities/article";
import * as shortid from 'shortid';
import { IArticleService } from "./iArticleService";

class ArticleService implements IArticleService{

    constructor(private db: any){        
    }

    createArticle(article: Article) : Promise<Article> {
        return new Promise<Article>(resolve => {
            article.id = shortid.generate();
            this.db.get('articles').push(article).write();
            resolve(article);
        });              
    }

    /**
     * Getting the articles
     * @param count Number of articles or 0 if all
     */
    getArticles(count: number = 0): Promise<Article[]>{
        return new Promise<Article[]>(resolve => {
            let articlesQuery = this.db.get('articles');
            if(count === 0){
                return articlesQuery.value();
            }
            
            resolve( articlesQuery.take(count).value());
        });
       
    }
}

export { ArticleService };