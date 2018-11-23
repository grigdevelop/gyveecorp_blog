import SqlDatabaseProvider from "./providers/sql.database.provider";
import RepositoryLocator from "./locators/repo.locator";
import ServiceLocator from "./locators/service.locator";
import ControllerLocator from "./locators/controller.locator";
import Application from "./application";
import IEnvironment from "../core/iEnvironment";

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

export default AppEnvironment;

