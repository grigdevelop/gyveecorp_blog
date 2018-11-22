import * as express from "express";
import * as bodyParser from 'body-parser';
import {Express} from "express";
import { PubSub } from "./utils/PubSub";
import { Server } from "http";

class ExpressApp {

    public AppEvents: PubSub = new PubSub();    
    private port: number = 8888;
    private server: Server;

    constructor(public app: Express) {

    }

    run(): void {
        let self = this;

        this.server = this.app.listen(self.port, () => {
            console.log("Listening host", self.port, ".");
            self.AppEvents.emit("onAppStarted", self.app);
        });
    }

    runAsync(port: number):Promise<ExpressApp>{
        let self = this;

        return new Promise(resolve => {

            self.server = self.app.listen(port, () => {
                // after server runs
                console.log("Async Listening host:", port);
                resolve(self);

            });

        });
    }

    stopServer(){
        this.server.close(() => {
            console.log("server successfully stopped");
        });
    }
}

let app = express();
app.use(bodyParser.json());
let expressApp = new ExpressApp(app);

export { expressApp };