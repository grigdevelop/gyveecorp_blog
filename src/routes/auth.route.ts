import { Express, Request, Response, NextFunction } from 'express';
import { BaseRoute } from ".";
import { IEnvironment } from '../core';

class AuthRoute extends BaseRoute{

    constructor(environment: IEnvironment){
        super(environment);
    }

    setup(app: Express): void {
        let controller = this.environment.application.controllerLocator.authController;      

        app.post('/login', (request: Request, response: Response) => {
            this.json(response, async () => controller.login(request.body));
        });
    }

}

export { AuthRoute };