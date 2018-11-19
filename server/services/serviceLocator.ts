import { ArticleService } from "./articleService";

class ServiceLocator{

    articleService: ArticleService;

    constructor(db: any){
        this.articleService = new ArticleService(db);
    }

}

export {ServiceLocator};