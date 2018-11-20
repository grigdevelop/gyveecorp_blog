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
            this.app.get(finalRoute, async (req, resp) => {

                // setting controller context
                controller.request = req;
                controller.response = resp;
                
                try{
                    // calling action from controller
                    resp.send(await actionFn.apply(controller));       
                } catch (ex){
                    this.handleError(resp, ex);
                }
                    
            });        
        });

        actions.post.forEach(action => {

            // get action name which is also route name
            let actionRoute = action['route'] as string;
            let actionFn = action['action'] as Function;
            let finalRoute = '/' + baseRoute + '/' + actionRoute;
    
            // configure get routes
            this.app.post(finalRoute,async (req, resp) => {
    
                // setting controller context
                controller.request = req;
                controller.response = resp;
                
                try{
                    // calling action from controller                          
                    resp.send(await actionFn.apply(controller, [req.body]));           
                } catch(ex){
                    this.handleError(resp, ex);
                }
              
            });        

        });

        return this;
    }

    private handleError(resp, err: any){
        resp.json({error: err});
    }
}

export {RouteConfigurer};