import * as express from "express";
import * as bodyParser from 'body-parser';
import {Express} from "express";
import { PubSub } from "./utils/PubSub";
import { Server } from "http";
import * as cors from 'cors';

class ExpressApp {

    public AppEvents: PubSub = new PubSub();    // TODO: maybe deprecated
    private port: number = 8888; // default port
    private server: Server;


    constructor(public app?: Express){
        if(!app){
            this.app = express();
            this.app.use(bodyParser.json());           
            this.app.use(cors());
        }
    }

    run(): void {
        let self = this;

        this.server = this.app.listen(self.port, () => {
            console.log("Listening host", self.port, ".");
            self.AppEvents.emit("onAppStarted", self.app);
        });
    }

    runAsync(port: number):Promise<any>{
        let self = this;
        self.port = port;

        return new Promise(resolve => {

            self.server = self.app.listen(port, () => {
                // after server runs
                console.log("Async Listening host:", port);
                resolve(null);
            });

        });
    }

    stopServer(): Promise<any>{
        let self = this;

        return new Promise<any>(resolve => {
            this.server.close(() => {
                console.log("Server at port", this.port, "stopped");
                resolve(null);
            });
        });
      
    }
}

let expressApp = new ExpressApp();

export { expressApp };