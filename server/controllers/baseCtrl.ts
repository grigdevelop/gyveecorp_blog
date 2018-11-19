import { ActionRoutes } from "../routes/actionRoutes";
import { ServiceLocator } from "../services/serviceLocator";

abstract class BaseCtrl{
    request: any;
    response: any;
    serviceLocator: ServiceLocator;
    actionRoutes: ActionRoutes = new ActionRoutes();

    /**
     * Configure actions and return base route
     */
    abstract configureActions() : string;
}

export { BaseCtrl };