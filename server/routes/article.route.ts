import {Express, Request, Response } from 'express';
import { IEnvironment } from '../core';

class ArticleRoutes{

    constructor(private environment: IEnvironment){

    }

    setup(app: Express):void{
       
        let controller = this.environment.application.controllerLocator.articleController;

        app.get('/article/getArticles', async (resuest: Request, response: Response) => {
            let result = await controller.getArticles();
            response.json(result);
        });

        app.post('article/createArticle', async (request: Request, response: Response)=> {
            let result = await controller.createArticle(request.body);
            response.json(result);
        });
    }
}

export default ArticleRoutes;