import { IEnvironment } from "./../core";
import { Express, Response} from 'express';
import { ResponseResult } from "./../core/http/ResponseResult";
import { ApiError } from "../core/http/errors";

/**
 * Describe the base class for routes
 */
abstract class BaseRoute{

    /**     
     * @constructor
     * @param {IEnvironment} environment  - Current application environement
     */
    constructor(protected environment: IEnvironment){

    }

    /**
     * Function for safely sending information to client. Handles the error. 
     * @param { Response } response - @type {Express} response object
     * @param { () => any} executeAction - Function which result will be sent to client as json
     */
    protected async json(response: Response, executeAction: () => any){

        try{

            let result = await executeAction();
            response.json(new ResponseResult(result));

        }catch(error){

            let result = new ResponseResult(null, new ApiError(error));
            response.json(result);

        }

    }

    abstract setup(app: Express):void;
}

export default BaseRoute;