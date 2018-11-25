import { Express, Request, Response, NextFunction } from 'express';
import { BaseRoute } from ".";
import { IEnvironment } from '../core';

class AuthRoute extends BaseRoute{

    constructor(environment: IEnvironment){
        super(environment);
    }

    setup(app: Express): void {
        let controller = this.environment.application.controllerLocator.authController;
        
        app.all('/*', async (request: Request, response: Response, next: NextFunction) => {

            if(request.url === '//login'){
                return this.json(response, async () => controller.login(request.body));                
            }

            let token: any = request.headers['authorization-token'];

            if( token ){
                await this.environment.application.controllerLocator.authService.setAuthorized(token);
                next();
            } else{
                this.json(response, () => {
                    throw new Error('token not found');
                });
            }
        })
    }

}

export { AuthRoute };