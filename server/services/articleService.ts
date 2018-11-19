import { Article } from "../data/entities/article";
import * as shortid from 'shortid';

class ArticleService {

    constructor(private db: any){        
    }

    createArticle(article: Article) : Article {
        article.id = shortid.generate();
        this.db.get('articles').push(article).write();
        return article;
    }
}

export { ArticleService };