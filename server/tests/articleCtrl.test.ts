import { IDbProvider, DbProvider } from "../data/repo/dbProvider";
import { LowDbWithScheme } from "../data/repo/lowDatabase";
import { ServiceLocator } from "../services/serviceLocator";
import { expressApp } from "../app";
import { RouteConfigurer } from "../routes/routeConfigurer";
import { ArticleCtrl } from "../controllers/articleCtrl";


const dbProvider : IDbProvider<LowDbWithScheme, any> = new DbProvider('db.json');
const serviceLocator = new ServiceLocator(dbProvider, 'test');

new RouteConfigurer(serviceLocator, expressApp.app)
    .forController(new ArticleCtrl());

it('Should do something',async () => {
    let app = await expressApp.runAsync(7777);
    console.log("now application running in test");
    app.stopServer();
});


