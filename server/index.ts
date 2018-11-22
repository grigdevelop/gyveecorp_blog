import { expressApp } from "./app";
import { ServiceLocator } from "./services/serviceLocator";

import { ArticleCtrl } from "./controllers/articleCtrl";
import { RouteConfigurer } from "./routes/routeConfigurer";
import { IDbProvider, DbProvider } from "./data/repo/dbProvider";
import { LowDbWithScheme } from "./data/repo/lowDatabase";

const dbProvider : IDbProvider<LowDbWithScheme, any> = new DbProvider('db.json');
const serviceLocator = new ServiceLocator(dbProvider, 'local');

new RouteConfigurer(serviceLocator, expressApp.app)
    .forController(new ArticleCtrl());

let s = async () => {
    await expressApp.runAsync(8888);
};
s();

