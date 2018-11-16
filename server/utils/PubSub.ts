class PubSub {

    private events:any = {};

    on(eventName: string, handler: Function):void{
        this.events[eventName] = this.events[eventName] || [];
        this.events[eventName].push(handler);
    }

    off(eventName: string, handler: Function):void{
        if(this.events[eventName]){
            for(let i = 0; i < this.events[eventName].length; i += 1){
                if(this.events[eventName][i] === handler){
                    this.events[eventName].splice(i, 1);
                    break;
                }
            }
        }
    }

    emit(eventName: string, ...prms){
        if(this.events[eventName]){
            this.events[eventName].forEach(f => f(prms));
        }
    }
   
}

export { PubSub };