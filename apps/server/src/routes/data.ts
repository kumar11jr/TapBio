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
  const acc = await UrlData.findOne({ userId: req.userId });
  if (!acc) {
    res.status(403).json({
      msg: "Invalid User",
    });
  }
  await UrlData.updateOne(
    { userId: req.userId },
    { $push: { links: { url: "Hello" } } }
  );

  res.status(200).json({ msg: "Okiee" });
});

export { router };
