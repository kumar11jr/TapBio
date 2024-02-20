import { Router } from "express";
const router = Router();
import { router as userRouter } from "./user";

router.use("/user", userRouter);

module.exports = router;
export {};
