import { z } from "zod";

// Mathematically enforces exact payload boundaries restricting invalid API traffic natively on the client
export const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters").max(50),
  password: z.string().min(8, "Security key must be strictly at least 8 characters").max(200),
});

// Infer strict TypeScript forms natively for the UI interfaces
export type LoginFormValues = z.infer<typeof loginSchema>;
