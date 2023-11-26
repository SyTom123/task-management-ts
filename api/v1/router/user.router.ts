import { Router } from "express";
import * as controller from "../../v1/controllers/user.controller";
import * as authMiddleware from "../../v1/middleware/authen.middleware";

const router: Router = Router();

router.post("/register", controller.register);

router.post("/login", controller.login);

router.get("/detail", authMiddleware.requireAuth, controller.detail);

export default router;