import { IEnvironment } from "./../core";
import { Express, Response} from 'express';
import { ResponseResult } from "./../core/http/ResponseResult";

abstract class BaseRoute{

    constructor(protected environment: IEnvironment){

    }

    protected async json(response: Response, executeAction: () => any){
        try{
            let result = await executeAction();
            response.json(new ResponseResult(result));
        }catch(error){
            response.json(new ResponseResult(null, error));
        }
    }

    abstract setup(app: Express):void;
}

export default BaseRoute;