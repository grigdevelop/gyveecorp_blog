import * as express from "express";
import {Express} from "express";
import { PubSub } from "./utils/PubSub";





class ExpressApp {

    public AppEvents: PubSub = new PubSub();

    constructor(private app: Express) {

    }

    run(): void {
        // tslint:disable-next-line:no-empty
        let self = this;
        this.app.listen(8888, () => {
            console.log("Listening host 8888.");
            self.AppEvents.emit("onAppStarted", self.app);
        });
    }
}

// tslint:disable-next-line:typedef
let app = express();

app.listen(8888, () => console.log("Listening port 8888."));

export { app };