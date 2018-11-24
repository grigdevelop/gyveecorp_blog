import { ApiError } from "./errors";

class ResponseResult<TData>{

    constructor(public data: TData = null,public error: ApiError = null){

    }
}

export { ResponseResult };