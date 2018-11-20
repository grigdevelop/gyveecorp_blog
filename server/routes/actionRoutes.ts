import { HttpMethod } from "../infra/httpMethods";

type RouteItemType = {
    route: string;
    action: Function;
};

class ActionRoutes{

    public post: RouteItemType[] = [];
    public get: RouteItemType[] = [];

    addAction(method: HttpMethod, route: string,  action: Function){
        switch (method) {
            case HttpMethod.POST:
                this.post.push({route, action});
                break;
            case HttpMethod.GET:
                this.get.push({route, action});
                break;            
            default:
                break;
        }
    }
}

export {ActionRoutes};