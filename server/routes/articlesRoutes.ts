import {Express} from 'express';
import { ServiceLocator } from '../services/serviceLocator';

class ArticleRoutes{

    constructor(private app: Express,private services: ServiceLocator){

    }
}