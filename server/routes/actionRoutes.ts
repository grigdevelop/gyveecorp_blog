import { HttpMethod } from "../infra/httpMethods";

type RouteItemType = {
    route: string;
    action: Function;
};

/**
 * Dictionnary for route types
 */
interface RouteActionsDic{
  [index: number]: RouteItemType[];
}

class ActionRoutes{

    private routeActions: RouteActionsDic = {};

    constructor(){

        // initializing empty routes
        this.routeActions[HttpMethod.GET] = [];
        this.routeActions[HttpMethod.POST] = [];
    }

    addAction(method: HttpMethod, route: string,  action: Function):void{
        this.routeActions[method].push({route, action});        
    }

    getActions(method: HttpMethod): RouteItemType[]{
        return this.routeActions[method];
    }
}

export {ActionRoutes};