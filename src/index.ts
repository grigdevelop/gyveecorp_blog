import * as express from 'express';
import { Express } from 'express';
import { IEnvironment } from './core';
import { AppEnvironment } from './domain';
import { ArticleRoutes } from './routes';
import { AuthRoute } from './routes/auth.route';

const app: Express = express();
const environment: IEnvironment = new AppEnvironment();
const articleRoutes: ArticleRoutes = new ArticleRoutes(environment);
const authRoutes: AuthRoute = new AuthRoute(environment);

authRoutes.setup(app);
articleRoutes.setup(app);

app.get('/', (req, resp) => {
    resp.json({server: 'another good succes'});
});

app.listen(8888, () => {
    console.log("listening port 8888");
});
