import * as z from 'zod';

export const LoginSchema = z.object({
    email: z.string().email({
      message: "Email is required",
    }),
    password: z.string().min(1, {
      message: "Password is required",
    }),
  });

  export const RegisterSchema = z.object({
    email: z.string().email({
      message: "Email is required",
    }),
    password: z.string().min(8, {
      message: "Password must be minimum 6 characters",
    }).max(30, {
        message: "Password character exceeded! 30 Characters Max",
    }),
    username: z.string().min(3, {
      message: "Username is must be minimum 3 characters",
    }).max(10, {
      message: "Password character exceeded! 10 Characters Max",
    }),
  });
  