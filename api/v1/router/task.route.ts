import { Router } from "express";
const router: Router = Router();
import * as controller from "../../v1/controllers/task.controller";
router.get("/", controller.index );

router.get("/detail/:id", controller.detail );

router.patch("/change-status/:id", controller.changeStatus );

router.patch("/change-multi", controller.changeMulti );

router.post("/create", controller.create );

export default router;