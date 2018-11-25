import { IEnvironment } from "./../../src/core";
import { Application } from "./../../src/domain";
import { IServiceLocator, IRepositoryLocator } from "./../../src/core/locators";
import { LocalDatabaseProvider } from "./../../src/domain/providers";
import { RepositoryLocator, ServiceLocator, ControllerLocator } from "./../../src/domain/locators";

class TestEnvironment implements IEnvironment{

    readonly application: Application;
    readonly serviceLocator: IServiceLocator;
    readonly databaseProvider: LocalDatabaseProvider;
    
    constructor(dbPath: string = 'src/assets/db/testdb.json'){
        this.databaseProvider = new LocalDatabaseProvider(dbPath);
        let repo :IRepositoryLocator = new RepositoryLocator(this.databaseProvider);
        this.serviceLocator = new ServiceLocator(repo)
        let ctrl: ControllerLocator = new ControllerLocator(this.serviceLocator)
        this.application = new Application(ctrl);
    }
}

export { TestEnvironment };