import { Router, Request, Response } from "express";
const router = Router();
import zod from "zod";
import { UrlData, User } from "../db/db";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import authMiddleWare from "../middleware";
import { Req } from "./data";

const signupSchema = zod.object({
  email: zod.string(),
  username: zod.string(),
  password: zod.string(),
  name: zod.string(),
});

const signinSchema = zod.object({
  email: zod.string().optional(),
  username: zod.string().optional(),
  password: zod.string(),
});

router.post("/signup", async (req: Request, res: Response) => {
  const { email, username, password, name } = req.body;
  const { success } = signupSchema.safeParse(req.body);
  if (!success) {
    return res.status(403).json({
      msg: "invalid inputs",
    });
  }

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(403).json({
      msg: "user already exists/username already taken",
    });
  }

  const user = await User.create({
    email,
    username,
    password,
    name,
  });
  const userId = user._id;
  const token = jwt.sign({ userId }, JWT_SECRET);

  await UrlData.create({
    _id: userId,
    userId,
    links: { url: "" },
  });

  res.status(200).json({
    msg: "User created Successfully",
    token,
  });
});

router.post("/signin", async (req: Request, res: Response) => {
  const { success } = signinSchema.safeParse(req.body);
  if (!success) {
    return res.status(403).json({
      msg: "Invalid details",
    });
  }
  const { email, password } = req.body;

  const user = await User.findOne({
    email,
    password,
  });
  if (user) {
    const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    res.status(200).json({
      token: token,
      username: user.username,
      email,
      name: user.name,
    });
    return;
  }

  res.status(411).json({
    msg: "Error while logging in",
  });
});

// @ts-ignore
router.get("/me", authMiddleWare, async (req: Req, res: Response) => {
  const uid = req.userId;
  const user = await User.findOne({ _id: uid });
  const data = {
    name: user?.name,
    username: user?.username,
    email: user?.email,
  };
  res.status(200).json(data);
});

export { router };
