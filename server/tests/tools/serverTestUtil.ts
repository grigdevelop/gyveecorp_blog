import { IDbProvider, DbProvider } from "./../../data/repo/dbProvider";
import { LowDbWithScheme } from "./../../data/repo/lowDatabase";
import { ServiceLocator } from "./../../services/serviceLocator";
import { RouteConfigurer } from "./../../routes/routeConfigurer";
import { expressApp } from "./../../app";
import { ArticleCtrl } from "./../../controllers/articleCtrl";

class ServerTestUtil{
    private static dbProvider: IDbProvider<LowDbWithScheme, any>;
    
    static init():void{
        const dbProvider : IDbProvider<LowDbWithScheme, any> = new DbProvider('db.json');
        const serviceLocator = new ServiceLocator(dbProvider, 'test');
        
        new RouteConfigurer(serviceLocator, expressApp.app)
            .forController(new ArticleCtrl());

        this.dbProvider = dbProvider;
    }

    static run():Promise<any>{
        return expressApp.runAsync(7777);
    }

    static stop():Promise<any>{
        return expressApp.stopServer();
    }

    static dropLocalDb():void{
      
    }
}

interface ITestEnvironment{
    init():void;
    globalBegin():Promise<any>;
    globalEnd():Promise<any>;

    testBegin():void;
    testEnd():void;

    getServiceLocator():ServiceLocator;

    localDbArranger: LocalDbArranger;
}

class LocalDbArranger{
    
    constructor(private dbProvider: IDbProvider<LowDbWithScheme, any>){

    }

    insert(table: string, entity: any){
        this.dbProvider.getLocalDb()
            .get(table)
            .push(entity)
            .write();
    }

    resetDb():void{
        let db = this.dbProvider.getLocalDb();
        let nullState = {articles: [], authors: []};
        db.setState(nullState); // set empty state
        db.write(); // write state to file
        db.read(); // update state in memory for sure
    }
}

class TestEnvironment implements ITestEnvironment{
    
    private dbProvider: IDbProvider<LowDbWithScheme, any>;
    private serviceLocator: ServiceLocator;

    public localDbArranger: LocalDbArranger;
   
    init(){
        this.dbProvider = new DbProvider('db.json');
        this.serviceLocator = new ServiceLocator(this.dbProvider, 'test');
        this.localDbArranger = new LocalDbArranger(this.dbProvider);

        expressApp.app.get('/test', (req, res) => {
            res.json({server: 'ok'});
        })
        
        new RouteConfigurer(this.serviceLocator, expressApp.app)
            .forController(new ArticleCtrl());
    }

    globalBegin(): Promise<any> {
        return expressApp.runAsync(7777);
    }


    globalEnd(): Promise<any> {
        return expressApp.stopServer();
    }

    testBegin(): void {
        throw new Error("Method not implemented.");
    }

    testEnd(): void {
        throw new Error("Method not implemented.");
    }

    getServiceLocator():ServiceLocator{
        this.dbProvider.getLocalDb().read();// update state before getting provider
        return this.serviceLocator;
    }
}

let testEnvironment : ITestEnvironment = new TestEnvironment();
testEnvironment.init();

export { ServerTestUtil, testEnvironment };