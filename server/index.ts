import { expressApp } from "./app";
import { ServiceLocator } from "./services/serviceLocator";

import {db} from './data/repo/lowDatabase';
import { BaseCtrl } from "./controllers/baseCtrl";
import { ActionRoutes } from "./routes/actionRoutes";
import { ArticleCtrl } from "./controllers/articleCtrl";

const serviceLocator = new ServiceLocator(db);

let controllers: BaseCtrl[] = [];
controllers.push(new ArticleCtrl());

controllers.forEach(controller => {

    // set controller services
    controller.serviceLocator = serviceLocator;

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
        expressApp.app.get(finalRoute, (req, resp) => {

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
         expressApp.app.post(finalRoute, (req, resp) => {
 
             // setting controller context
             controller.request = req;
             controller.response = resp;
             
             // calling action from controller                          
             resp.send(actionFn.apply(controller, [req.body]));            
         });        

    });

});

// expressApp.app.get('/articles', (req, resp) => {
//     resp.send([{id: 1, name: 'my name'}, {id: 2, name: 'your name'}]);
// });


expressApp.run();
