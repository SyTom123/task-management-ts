import taskRoutes from "./task.route";
import userRoutes from "./user.router";
import { Express } from "express";

const mainV1Router = (app: Express): void=> {
    const version = "/api/v1";
    app.use(version + "/tasks", taskRoutes);
    app.use(version + "/users", userRoutes);
}

export default mainV1Router;