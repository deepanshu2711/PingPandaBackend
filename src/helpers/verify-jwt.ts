import jwt from "jsonwebtoken";

export const verifyJwt = (token: string) => {
  try {
    jwt.verify(token, process.env.JWT_SECRET as string);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
