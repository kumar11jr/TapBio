import { Router, Request, Response } from "express";
import authMiddleWare from "../middleware";
import { UrlData } from "../db/db";
const router = Router();

export interface Req extends Request {
  userId: string;
  links?: ILinks[];
}

interface ILinks {
  link: string;
  platform: string;
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
  const { links } = req.body;
  // TEST DATA
  // const links: any[] = [
  //   { link: "ajshdklaj", platform: "Aditya Singh" },
  //   { link: "2ajshdklaj", platform: "2skdjasd" },
  // ];
  const acc = await UrlData.findOne({ userId: req.userId });
  if (!acc) {
    res.status(403).json({
      msg: "Invalid User",
    });
  }

  //Send post req to http://localhost:8080/api/v1/data/addurl
  // Don't forget to add auth bearer token (Login(http://localhost:8080/api/v1/data/signin) first to get bearer token)

  let update = await UrlData.updateOne(
    { userId: req.userId },
    { $set: { links: { url: links } } }
  );

  if (!update) {
    res.status(403).json({
      msg: "There was an error while updating the data",
    });
  }

  res.status(200).json({ msg: "Data uploaded successfully" });
});

export { router };
