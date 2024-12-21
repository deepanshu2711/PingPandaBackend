import { z } from "zod";

export const CreateEventSchema = z.object({
  formattedString: z.string().optional(),
  name: z.string().optional(),
  fields: z
    .record(z.string().or(z.number()).or(z.boolean()))
    .refine((data) => Object.keys(data).length > 0, {
      message: "Fields cannot be empty",
    }),
  category: z.string().min(1, { message: "Event category Name is required" }),
});
