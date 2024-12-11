import jwt from "jsonwebtoken";

export const generateJwt = (id: string, apiKey: string) => {
  return jwt.sign({ id, apiKey }, process.env.JWT_SECRET as string, {
    expiresIn: "1h",
  });
};
