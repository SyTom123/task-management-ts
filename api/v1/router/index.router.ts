import taskRoutes from "./task.route";
import { Express } from "express";
const mainV1Router = (app: Express): void=> {
    const version = "/api/v1";
    app.use(version + "/tasks", taskRoutes);
}
export default mainV1Router;