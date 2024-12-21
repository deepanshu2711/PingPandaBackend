import z from "zod";

export const eventCategorySchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  color: z.string().min(1, { message: "Color is required" }),
  emoji: z.string().min(1, { message: "Emoji is required" }),
  userId: z.string().min(1, { message: "User ID is required" }),
});

export const quickStartEventCategorySchema = z.object({
  userId: z.string().min(1, { message: "userId is missing" }),
});
