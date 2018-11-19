import { expressApp } from "./app";
import { ServiceLocator } from "./services/serviceLocator";

import {db} from './data/repo/lowDatabase';
import { ArticleCtrl } from "./controllers/articleCtrl";
import { RouteConfigurer } from "./routes/routeConfigurer";

const serviceLocator = new ServiceLocator(db, 'local');
new RouteConfigurer(serviceLocator, expressApp.app)
    .forController(new ArticleCtrl());

expressApp.run();
