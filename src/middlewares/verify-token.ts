import { NextFunction, Request, Response } from "express";
import { verifyJwt } from "../helpers/verify-jwt";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const isTokenValid = verifyJwt(token);

  if (!isTokenValid) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  next();
};
