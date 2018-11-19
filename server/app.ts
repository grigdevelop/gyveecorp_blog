import * as express from "express";
import * as bodyParser from 'body-parser';
import {Express} from "express";
import { PubSub } from "./utils/PubSub";

class ExpressApp {

    public AppEvents: PubSub = new PubSub();    
    private port: number = 8888;

    constructor(public app: Express) {

    }

    run(): void {
        let self = this;

        this.app.listen(self.port, () => {
            console.log("Listening host", self.port, ".");
            self.AppEvents.emit("onAppStarted", self.app);
        });
    }
}

let app = express();
app.use(bodyParser.json());
let expressApp = new ExpressApp(app);
export { expressApp };