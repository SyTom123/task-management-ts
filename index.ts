import express, {Express} from 'express';
import * as database from "./config/database";
import cors from "cors";
import dotenv from "dotenv";
import Task from './api/v1/model/task.model';
import mainV1Router from './api/v1/router/index.router';
dotenv.config();

// connect database
database.connect();
const app: Express = express ();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// const corsOptions = {
//     origin: "http://example.com",
//     optionsSuccessStatus: 200
// }
// app.use(cors(corsOptions));

app.use(cors());

mainV1Router(app);


const port: number | string = process.env.PORT || 3000;
app.listen(port, ()=> {
    console.log(`App is listening on port ${port}`)
})
