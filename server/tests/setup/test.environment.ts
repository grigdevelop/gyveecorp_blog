import { IEnvironment } from "../../core";
import { Application } from "../../domain";
import { LocalDatabaseProvider } from "../../domain/providers";
import { ControllerLocator, ServiceLocator, RepositoryLocator } from "../../domain/locators";
import { IServiceLocator, IRepositoryLocator } from "../../core/locators";

class TestEnvironment implements IEnvironment{
    readonly application: Application;
    readonly serviceLocator: IServiceLocator;
    readonly databaseProvider: LocalDatabaseProvider;
    
    constructor(){
        this.databaseProvider = new LocalDatabaseProvider('testdb.json');
        let repo :IRepositoryLocator = new RepositoryLocator(this.databaseProvider);
        this.serviceLocator = new ServiceLocator(repo)
        let ctrl: ControllerLocator = new ControllerLocator(this.serviceLocator)
        this.application = new Application(ctrl);
    }
}

export { TestEnvironment };