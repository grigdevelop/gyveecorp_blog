import { ArticleService } from "./articleService";
import { IArticleService } from "./iArticleService";
import { ArticleSqlService } from "./articleSqlService";

class ServiceLocator{

    articleService: IArticleService;

    services: {};
    
    constructor(private db: any, mode: string){

        switch(mode){
            case "sql":
                //this.articleService = new ArticleSqlService(db);
                break;
            case "local":
            case "test":
                this.articleService = new ArticleService(db);
                break;                
        }
    }    

}

export {ServiceLocator};