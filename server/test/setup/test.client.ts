import { TestServer } from "./test.server";
import axios from 'axios';


class TestClient{

    private readonly baseUrl:string;

    constructor(server: TestServer){
        this.baseUrl = `${server.HostBase}:${server.Port}`;
    }

    public get<TResult>(url: string): Promise<TResult>{
        return new Promise<TResult>(resolve => {
            axios.get<TResult>(`${this.baseUrl}/${url}`).then(resp => {
                resolve(resp.data);
            });
        });
    }
}

export { TestClient };