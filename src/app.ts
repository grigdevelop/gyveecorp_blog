import * as express from 'express';
import {Express} from "express";
import bodyParser = require('body-parser');
import cors = require('cors');

let app: Express = express();
app.use(bodyParser.json());           
app.use(cors());


export default app;