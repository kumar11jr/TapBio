import { Router, Request, Response } from "express";
import authMiddleWare from "../middleware";
import { User, UrlData } from "../db/db";
const router = Router();

interface Req extends Request {
  userId: string;
  links: [];
}

// @ts-ignore
router.post("/addurl", authMiddleWare, async (req: Req, res: Response) => {
  const { links } = req.body;
  const userId = req.userId;
  const user = await User.findOne({ userId: req.userId });
  res.json({ user });

  const send = await UrlData.create({
    userId,
    links,
  });
  res.status(200).json({ msg: "Okiee" });
});

export { router };
