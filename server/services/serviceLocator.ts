import { ArticleService } from "./articleService";
import { IArticleService } from "./iArticleService";
import { ArticleSqlService } from "./articleSqlService";
import { IDbProvider } from "../data/repo/dbProvider";
import { LowdbSync } from "lowdb";

class ServiceLocator{

    articleService: IArticleService;
    
    constructor(dbProvider: IDbProvider<LowdbSync<any>, any>, mode: string){

        switch(mode){
            case "sql":
                //this.articleService = new ArticleSqlService(db);
                break;
            case "local":
            case "test":
                this.articleService = new ArticleService(dbProvider.getLocalDb());
                break;                
        }
    }    

}

export {ServiceLocator};