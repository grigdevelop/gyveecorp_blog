import { Express, Request, Response } from 'express';

interface IEnvironment{
    readonly application: Application;
}

class Article{
    firstName: string;
    lastName: string;
}

class AppEnvironment implements IEnvironment{
    readonly application: Application;

    constructor(){
        let sql = new SqlDatabaseProvider();
        let rp = new RepositoryLocator(sql)
        let sp = new ServiceLocator(rp);
        let cp = new ControllerLocator(sp);
        this.application = new Application(cp);
    }

}

/* Repository */

interface IArticleRepository {
    getArticles():Promise<Article[]>;
    createArticle(article: Article):Promise<Article>;
}

class ArticleLocalRepository implements IArticleRepository{

    constructor(private localDb: any){

    }

    getArticles(): Promise<Article[]> {
        throw new Error("Method not implemented.");
    }

    createArticle(article: Article): Promise<Article> {
        throw new Error("Method not implemented.");
    }
}

class ArticleSqlRepoistory implements IArticleRepository{

    constructor(private sqlDb: any){

    }

    getArticles(): Promise<Article[]> {
        return new Promise<Article[]>(resolve => {
            let articles: Article[] = [
                {firstName: 'greg', lastName: 'alex'},
                {firstName: 'vardan', lastName: 'mutex'}
            ];
            resolve(articles);
        });
    }

    createArticle(article: Article): Promise<Article> {
        throw new Error("Method not implemented.");
    }    
}

/* Service */

interface IArticleService {
    getArticles():Promise<Article[]>;
    createArticle(article: Article):Promise<Article>;
}

class ArticleService implements IArticleService{
   
    constructor(private readonly articleRepository: IArticleRepository){

    }

    getArticles(): Promise<Article[]> {
        return this.articleRepository.getArticles();
    }
    createArticle(article: Article): Promise<Article> {
        throw new Error("Method not implemented.");
    }


}

/* Controller */

class ArticleController {
    constructor(private readonly articleService: IArticleService){

    }

    getArticles():Promise<Article[]>{
        return this.articleService.getArticles();
    }

    createArticle(article: Article):Promise<Article>{
        throw new Error("Method not implemented.");
    }
}

interface IDatabaseProvider {
    createDatabase():any;
    readonly dbType: string;
}

class LocalDatabaseProvider implements IDatabaseProvider{
    readonly dbType: string;

    constructor(){
        this.dbType = 'local';
    }

    createDatabase() {
        throw new Error("Method not implemented.");
    }
}

class SqlDatabaseProvider implements IDatabaseProvider{
    readonly dbType: string;

    constructor(){
        this.dbType = 'sql';
    }

    createDatabase() {
        // throw new Error("Method not implemented.");
        return null;
    }

}

interface IRepositoryLocator {
    readonly articleRepository: IArticleRepository;
}

class RepositoryLocator implements IRepositoryLocator{
    public readonly articleRepository : IArticleRepository;

    constructor(databaseProvider: IDatabaseProvider){

        let database = databaseProvider.createDatabase();

        if(databaseProvider.dbType === 'sql'){
            this.articleRepository = new ArticleSqlRepoistory(database);
            return;
        }

        if(databaseProvider.dbType === 'local'){
            this.articleRepository = new ArticleLocalRepository(database);
            return;
        }
    }
}

interface IServiceLocator{
    readonly articleService: IArticleService;
}

class ServiceLocator implements IServiceLocator{

    public readonly articleService: IArticleService;

    constructor(repositoryLocator: IRepositoryLocator){
        this.articleService = new ArticleService(repositoryLocator.articleRepository);
    }
}

class ControllerLocator {

    public readonly articleController: ArticleController;

    constructor(serviceLocator: IServiceLocator){
        this.articleController = new ArticleController(serviceLocator.articleService);
    }

}

class Application {

    constructor(readonly controllerLocator: ControllerLocator){

    }
}

class ArticleRoutes{

    constructor(private environment: IEnvironment){

    }

    setup(app: Express):void{
       
        let controller = this.environment.application.controllerLocator.articleController;

        app.get('/article/getArticles', async (resuest: Request, response: Response) => {
            let result = await controller.getArticles();
            response.json(result);
        });

        app.post('article/createArticle', async (request: Request, response: Response)=> {
            let result = await controller.createArticle(request.body);
            response.json(result);
        });
    }
}

export {IEnvironment, AppEnvironment, ArticleRoutes};