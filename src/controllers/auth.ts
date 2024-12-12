import { Request, Response } from "express";
import { User } from "../model/user";
import bcryptjs from "bcryptjs";
import { generateJwt } from "../helpers/generate-jwt";

export const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ error: "Invalid password" });
      return;
    }

    const token = generateJwt(user._id as unknown as string, user.apiKey);
    res.status(200).json({
      message: "Login successful",
      token: token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        apiKey: user.apiKey,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const signUp = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409).json({ error: "User already exists" });
      return;
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const apiKey = "pingpanda+" + Math.random().toString(36).substring(2, 15);
    const user = await User.create({
      email,
      password: hashedPassword,
      name,
      apiKey,
    });

    const token = generateJwt(user._id as unknown as string, user.apiKey);
    res.status(201).json({
      message: "User created successfully",
      token: token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        apiKey: user.apiKey,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
