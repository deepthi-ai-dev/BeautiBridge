import { UserRole } from "@prisma/client";
import { z } from "zod";

export const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .email("Enter a valid email address.");

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long.")
  .regex(/[A-Z]/, "Password must include at least one uppercase letter.")
  .regex(/[a-z]/, "Password must include at least one lowercase letter.")
  .regex(/[0-9]/, "Password must include at least one number.");

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required."),
  rememberMe: z.boolean(),
});

export const credentialsLoginSchema = loginSchema.extend({
  rememberMe: z.coerce.boolean().optional().default(false),
});

export const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters long."),
    phone: z.string().min(10, "Phone number must be at least 10 characters long."),
    city: z.string().min(2, "City is required."),
    dob: z.string().min(2, "Date of birth is required."),
    address: z.string().min(5, "Address is required."),
    confirmPassword: z.string().min(1, "Confirm your password."),
    email: emailSchema,
    password: passwordSchema,
    role: z.nativeEnum(UserRole, {
      error: "Choose whether you are a customer or beauty artist.",
    }),
    experience: z.string().optional(),
    about: z.string().optional(),
    languages: z.string().optional(),
    hobbies: z.string().optional(),
  })
  .superRefine((values, ctx) => {
    if (values.password !== values.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match.",
        path: ["confirmPassword"],
      });
    }
    if (values.role === UserRole.ARTIST) {
      if (!values.experience) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Experience is required.", path: ["experience"] });
      if (!values.about) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "About is required.", path: ["about"] });
      if (!values.languages) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Languages are required.", path: ["languages"] });
      if (!values.hobbies) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Hobbies are required.", path: ["hobbies"] });
    }
  });

export const roleSelectionSchema = z.object({
  callbackUrl: z.string().optional(),
  role: z.nativeEnum(UserRole, {
    error: "Choose your role to continue.",
  }),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type RoleSelectionInput = z.infer<typeof roleSelectionSchema>;
