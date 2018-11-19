import { Article } from "../data/entities/article";
import * as shortid from 'shortid';
import { IArticleService } from "./iArticleService";

class ArticleService implements IArticleService{

    constructor(private db: any){        
    }

    createArticle(article: Article) : Article {
        article.id = shortid.generate();
        this.db.get('articles').push(article).write();
        return article;
    }

    /**
     * Getting the articles
     * @param count Number of articles or 0 if all
     */
    getArticles(count: number = 0): Article[]{

        let articlesQuery = this.db.get('articles');
        if(count === 0){
            return articlesQuery.value();
        }
        return articlesQuery.take(count).value();
    }
}

export { ArticleService };