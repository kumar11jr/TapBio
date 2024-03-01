import jwt, { verify } from "jsonwebtoken";
import { JWT_SECRET } from "./config";
import { Request, Response } from "express";

interface Req extends Request {
  userId: string;
}

function authMiddleWare(req: Req, res: Response, next: any) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({});
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verify(token, JWT_SECRET);
    // @ts-ignore
    if (decoded.userId) {
      // @ts-ignore
      req.userId = decoded.userId;
      next();
    } else {
      return res.status(403).json({});
    }
  } catch (error) {
    return res.status(403).json({});
  }
}

export default authMiddleWare;
