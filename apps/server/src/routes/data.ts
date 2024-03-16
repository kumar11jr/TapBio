import { Router, Request, Response } from "express";
import authMiddleWare from "../middleware";
import { User, UrlData } from "../db/db";
const router = Router();

export interface Req extends Request {
  userId: string;
  links?: [];
}

//@ts-ignore
router.get("/geturl", authMiddleWare, async (req: Req, res: Response) => {
  const data = await UrlData.findOne({ userId: req.userId });

  if (!data) {
    res.status(403).json({ msg: "Error while Searching User" });
  }

  res.status(200).json({ msg: "Data fetched Successfully", data });
});

// @ts-ignore
router.post("/addurl", authMiddleWare, async (req: Req, res: Response) => {
  // const links: [] = req.body.links;
  const links: string[] = ["Hello", "Tjhis", "test"];
  const acc = await UrlData.findOne({ userId: req.userId });
  if (!acc) {
    res.status(403).json({
      msg: "Invalid User",
    });
  }

  //Send post req to http://localhost:8080/api/v1/data/addurl
  // Don't forget to add auth bearer token (Login(http://localhost:8080/api/v1/data/signin) first to get bearer token)
  let update;
  links.map(async (key, item) => {
    update = await UrlData.updateOne(
      { userId: req.userId },
      { $push: { links: { url: item } } }
    );
  });

  if (!update) {
    res.status(403).json({
      msg: "There was an error while updating the data",
    });
  }

  res.status(200).json({ msg: "Data uploaded successfully" });
});

export { router };
