import express, {Express} from 'express';
import * as database from "./config/database";
import dotenv from "dotenv";
import Task from './api/v1/model/task.model';
import mainV1Router from './api/v1/router/index.router';
dotenv.config();
database.connect();
const app: Express = express ();
const port: number | string = process.env.PORT || 3000;

mainV1Router(app);


app.listen(port, ()=> {
    console.log(`App is listening on port ${port}`)
})
