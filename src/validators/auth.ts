import z from "zod";

export const signInSchema = z.object({
  email: z.string().email().min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export const signUpSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email().min(1, { message: "Email is required" }),
  password: z
    .string()
    .min(3, { message: "Password must be at least 3 characters" }),
});

export const requestResetPasswordSchema = z.object({
  email: z.string().email().min(1, { message: "Email is required" }),
});

export const resetPasswordSchema = z.object({
  token: z.string().min(1, { message: "Token is required." }),
  newPassword: z
    .string()
    .min(3, { message: "Password must be at least 3 characters." }),
});
