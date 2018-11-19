import { ServiceLocator } from "../services/serviceLocator";
import {Express} from 'express';
import { BaseCtrl } from "../controllers/baseCtrl";
import { ActionRoutes } from "./actionRoutes";

class RouteConfigurer{

    constructor(private serviceLocator: ServiceLocator,private app: Express){

    }

    forController<TController extends BaseCtrl>(controller: TController):RouteConfigurer{
         // set controller services
        controller.serviceLocator = this.serviceLocator;

        // first configuring routes
        let baseRoute = controller.configureActions();

        // get already configured routes
        let actions : ActionRoutes = controller.actionRoutes;

        actions.get.forEach(action => {

            // get action name which is also route name
            let actionRoute = action['route'] as string;
            let actionFn = action['action'] as Function;
            let finalRoute = '/' + baseRoute + '/' + actionRoute;

            // configure get routes
            this.app.get(finalRoute, (req, resp) => {

                // setting controller context
                controller.request = req;
                controller.response = resp;
                
                // calling action from controller
                resp.send(actionFn.apply(controller));            
            });        
        });

        actions.post.forEach(action => {

            // get action name which is also route name
            let actionRoute = action['route'] as string;
            let actionFn = action['action'] as Function;
            let finalRoute = '/' + baseRoute + '/' + actionRoute;
    
            // configure get routes
            this.app.post(finalRoute, (req, resp) => {
    
                // setting controller context
                controller.request = req;
                controller.response = resp;
                
                // calling action from controller                          
                resp.send(actionFn.apply(controller, [req.body]));            
            });        

        });
        
        return this;
    }
}

export {RouteConfigurer};