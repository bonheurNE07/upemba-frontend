import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters").max(50),
  password: z.string().min(8, "Security key must be strictly at least 8 characters").max(200),
});

export const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters").max(50),
  name: z.string().min(2, "Full Name is required by the Gateway").max(255),
  email: z.string().email("Invalid corporate email protocol"),
  password: z.string().min(8, "Security key must be at least 8 characters").max(200),
  passwordConfirm: z.string(),
  role: z.enum(["ADMIN", "TECHNICIAN", "RANGER"]).default("RANGER"),
}).refine((data) => data.password === data.passwordConfirm, {
  message: "Security keys must geometrically match",
  path: ["passwordConfirm"],
});

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
