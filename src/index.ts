import { IEnvironment } from './core';
import { AppEnvironment } from './domain';
import { ArticleRoutes } from './routes';
import { AuthRoute } from './routes/auth.route';
import app from './app';

const environment: IEnvironment = new AppEnvironment();
const articleRoutes: ArticleRoutes = new ArticleRoutes(environment);
const authRoutes: AuthRoute = new AuthRoute(environment);

authRoutes.setup(app);
articleRoutes.setup(app);


app.listen(8888, () => {
    console.log("listening port 8888");
});
