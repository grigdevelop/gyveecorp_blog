class ActionRoutes{

    public post: {}[] = [];
    public get: {}[] = [];

    addAction(method: string, route: string,  action: Function){
        switch (method) {
            case 'post':
                this.post.push({route, action});
                break;
            case 'get':
                this.get.push({route, action});
                break;            
            default:
                break;
        }
    }
}

export {ActionRoutes};