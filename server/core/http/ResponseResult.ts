class ResponseResult<TData>{

    constructor(public data: TData = null,public error: Error = null){

    }
}

export { ResponseResult };