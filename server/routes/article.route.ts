import BaseRoute from './best.route';
import {Express, Request, Response } from 'express';
import { IEnvironment } from '../core';

class ArticleRoutes extends BaseRoute {

    constructor(environment: IEnvironment){
        super(environment);
    }

    setup(app: Express):void{
        
        let controller = this.environment.application.controllerLocator.articleController;

        app.get('/article/getArticles', (resuest: Request, response: Response) => {

            this.json(response, async () => await controller.getArticles());
        });

        app.post('/article/createArticle', (request: Request, response: Response)=> {
            this.json(response, async () => await controller.createArticle(request.body));
        });

        app.get('/article/getArticle/:id', (request: Request, response: Response)=> {
            this.json(response, async () => await controller.getArticle(request.params));
        });

        app.post('/article/deleteArticle', (request: Request, response: Response)=> {
            this.json(response, async () => await controller.deleteArticle(request.body));
        });
    }
}

export default ArticleRoutes;