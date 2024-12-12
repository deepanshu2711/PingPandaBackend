import { NextFunction, Request, Response } from "express";
import { ZodError, ZodSchema } from "zod";

export const validate =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      const parseBody = schema.parse(req.body);
      req.body = parseBody;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          error: error.errors[0].message,
        });
        return;
      }
      res.status(400).json({ error: "Validation failed" });
    }
  };
