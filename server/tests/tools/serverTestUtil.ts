import { IDbProvider, DbProvider } from "./../../data/repo/dbProvider";
import { LowDbWithScheme } from "./../../data/repo/lowDatabase";
import { ServiceLocator } from "./../../services/serviceLocator";
import { RouteConfigurer } from "./../../routes/routeConfigurer";
import { expressApp } from "./../../app";
import { ArticleCtrl } from "./../../controllers/articleCtrl";

class ServerTestUtil{
    
    static init():void{
        const dbProvider : IDbProvider<LowDbWithScheme, any> = new DbProvider('db.json');
        const serviceLocator = new ServiceLocator(dbProvider, 'test');
        
        new RouteConfigurer(serviceLocator, expressApp.app)
            .forController(new ArticleCtrl());
    }

    static run():Promise<any>{
        return expressApp.runAsync(7777);
    }

    static stop():Promise<any>{
        return expressApp.stopServer();
    }
}

export { ServerTestUtil };