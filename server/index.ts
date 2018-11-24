import * as express from 'express';
import { Express } from 'express';
import { IEnvironment } from './core';
import { AppEnvironment } from './domain';
import { ArticleRoutes } from './routes';

const app: Express = express();
const environment: IEnvironment = new AppEnvironment();
const articleRoutes: ArticleRoutes = new ArticleRoutes(environment);

articleRoutes.setup(app);

app.get('/', (req, resp) => {
    resp.json({server: 'another good succes'});
});

app.listen(8888, () => {
    console.log("listening port 8888");
});
