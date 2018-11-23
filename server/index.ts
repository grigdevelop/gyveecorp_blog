import * as express from 'express';
import { Express } from 'express';
import { IEnvironment, AppEnvironment, ArticleRoutes } from './core/application';

const app: Express = express();
const environment: IEnvironment = new AppEnvironment();
const articleRoutes: ArticleRoutes = new ArticleRoutes(environment);
articleRoutes.setup(app);

app.listen(8888, () => {
    console.log("listening port 8888");
});
