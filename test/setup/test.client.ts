import { TestServer } from "./test.server";
import axios from 'axios';
import { ResponseResult } from "./../../src/core/http/ResponseResult";


class TestClient{

    private readonly baseUrl:string;

    constructor(server: TestServer){
        this.baseUrl = `${server.HostBase}:${server.Port}`;
    }

    public get<TResult>(url: string): Promise<ResponseResult<TResult>>{
        return new Promise<ResponseResult<TResult>>(resolve => {
            axios.get<ResponseResult<TResult>>(`${this.baseUrl}/${url}`).then(resp => {
                resolve(resp.data);
            });
        });
    }

    public post<TResult>(url: string, data: any): Promise<ResponseResult<TResult>>{
        return new Promise<ResponseResult<TResult>>(resolve => {
            axios.post<ResponseResult<TResult>>(`${this.baseUrl}/${url}`, data).then(resp => {
                resolve(resp.data);
            });
        });
    }

    public setAuthToken(token: string):void{
        axios.defaults.headers['authorization-token'] = token;
    }
}

export { TestClient };