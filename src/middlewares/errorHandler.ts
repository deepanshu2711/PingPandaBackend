import { NextFunction, Request, Response } from "express";
import { errorResponce } from "../utils/responses";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);
  errorResponce(res, 500, err);
};
