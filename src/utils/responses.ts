import { Response } from "express";

export const successResponce = (
  res: Response,
  data: any,
  message: string = "Success"
) => {
  res.status(200).json({ success: true, data, message });
  return;
};

export const errorResponce = (res: Response, status: number, error: string) => {
  res.status(status).json({ success: false, error });
  return;
};
