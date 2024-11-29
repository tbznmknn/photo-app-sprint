import { z } from "zod";
const requiredString = z.string().trim().min(1, "Required");
export const signUpSchema = z
  .object({
    username: requiredString.regex(
      /^[a-zA-Z0-9_-]+$/,
      "Only letters, numbers, - and  _ allowed"
    ),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one digit")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
      ),
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
