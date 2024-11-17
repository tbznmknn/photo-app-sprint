import { z } from "zod";
const requiredString = z.string().trim().min(1, "Required");
export const signUpSchema = z
  .object({
    username: requiredString.regex(
      /^[a-zA-Z0-9_-]+$/,
      "Only letters, numbers, - and  _ allowed"
    ),
    password: requiredString.min(8, "Must be at least 8 characters"),
    location: z.string().optional(),
    description: z.string().optional(),
    occupation: z.string().optional(),
    first_name: requiredString,
    last_name: requiredString,
    confirmPassword: requiredString,
  })

  .refine((data) => data.password === data.confirmPassword, {
    message: "Password is not matching",
    path: ["confirmPassword"], // Specify the path of the field to which the error belongs
  });

export type SignUpValues = z.infer<typeof signUpSchema>;

export const loginSchema = z.object({
  username: requiredString,
  password: requiredString,
});
export type LoginValues = z.infer<typeof loginSchema>;

export const createPostSchema = z.object({
  content: requiredString,
});
