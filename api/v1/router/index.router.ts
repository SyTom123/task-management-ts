import taskRoutes from "./task.route";
import userRoutes from "./user.router";
import { Express } from "express";
import * as authMiddleware from "../../v1/middleware/authen.middleware";

const mainV1Router = (app: Express): void=> {
    const version = "/api/v1";
    app.use(version + "/tasks",authMiddleware.requireAuth ,taskRoutes);
    app.use(version + "/users", userRoutes);
}

export default mainV1Router;