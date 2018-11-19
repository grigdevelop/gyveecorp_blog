import * as express from "express";
import * as bodyParser from 'body-parser';
import {Express} from "express";
import { PubSub } from "./utils/PubSub";

class ExpressApp {

    public AppEvents: PubSub = new PubSub();    

    constructor(public app: Express) {

    }

    run(): void {
        let self = this;

        this.app.listen(8888, () => {
            console.log("Listening host 8888.");
            self.AppEvents.emit("onAppStarted", self.app);
        });
    }
}

let app = express();
app.use(bodyParser.json());
let expressApp = new ExpressApp(app);
export { expressApp };