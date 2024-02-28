import { Router } from "express";
const router = Router();
import { router as userRouter } from "./user";
import { router as dataRouter } from "./data";

router.use("/user", userRouter);
router.use("/data", dataRouter);

export { router };
