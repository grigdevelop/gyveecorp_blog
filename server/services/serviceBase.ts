abstract class ServiceBase{

    asyncResult<TResult>(callback: () => TResult): Promise<TResult>{
        return new Promise<TResult>(resolve => {
            resolve(callback());
        });        
    }

}

export {ServiceBase};