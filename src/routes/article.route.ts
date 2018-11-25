import BaseRoute from './base.route';
import {Express } from 'express';
import { IEnvironment } from '../core';

class ArticleRoutes extends BaseRoute {

    constructor(environment: IEnvironment){
        super(environment);
    }

    setup(app: Express):void{
        
        let controller = this.environment.application.controllerLocator.articleController;

        app.get('/article/getArticles', (resuest, response) => {
            this.json(response, async () => await controller.getArticles());
        });
      
        app.post('/article/createArticle', this.authenticate, (request, response)=> {
            this.json(response, async () => await controller.createArticle(request.body));
        });

        app.get('/article/getArticle/:id', (request, response)=> {
            this.json(response, async () => await controller.getArticle(request.params));
        });

        app.post('/article/deleteArticle', this.authenticate, (request, response)=> {
            this.json(response, async () => await controller.deleteArticle(request.body));
        });
    }
}

export default ArticleRoutes;