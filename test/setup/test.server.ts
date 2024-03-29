import { TestEnvironment } from "./test.environment";
import * as express from 'express';
import { Express } from 'express';
import * as http from "http";
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { ArticleRoutes } from "./../../src/routes";
import { AuthRoute } from "./../../src/routes/auth.route";
import { LocalDb } from "./../../src/domain/providers/local.database.provider";


class TestServer{

    private expressServer: http.Server;
    private readonly expressApp: Express;
    private envrionment: TestEnvironment;

    public readonly Port:number = 2222;
    public readonly HostBase:string = 'http://localhost'

    constructor(){

        // setup expres app
        this.expressApp = express();
        this.expressApp.use(bodyParser.json());           
        this.expressApp.use(cors());

        // setup global environment
        this.envrionment = new TestEnvironment('integrationDb.json');

        // configure routes
        const articleRoutes: ArticleRoutes = new ArticleRoutes(this.envrionment);
        const authRoutes: AuthRoute = new AuthRoute(this.envrionment);

        authRoutes.setup(this.expressApp);
        articleRoutes.setup(this.expressApp);
    }

    start():Promise<any>{
        let self = this;
        
        return new Promise<any>(resolve => {
            self.expressServer = self.expressApp.listen(self.Port, () => {
                console.log(`integration server on ${self.Port}.`);
                resolve(null);
            });
        });
    }

    stop():Promise<any>{
        let self = this;
        return new Promise<any>(resolve => {
            self.expressServer.close(() => {
                console.log(`integration server ${self.Port} stopped!`);
                resolve(null);
            });
        });
    }
    
    public getServerDatabase():LocalDb{
        return this.envrionment.databaseProvider.localDb;
    }

}

export { TestServer };