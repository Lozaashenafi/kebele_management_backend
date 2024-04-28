import { z } from "zod";

const userSchema = {
  register: z.object({
    email: z.string().email(),
    password: z.string(),
    phone: z.string(),
    firstName: z.string(),
    middleName: z.string(),
    lastName: z.string(),
    gender: z.string(),
  }),
  update: z.object(),
  login: z.object({
    email: z.string().email(),
    password: z.string().min(6),
  }),
  changePassword: z.object({
    userId: z.number(), // or email: z.string().email()
    currentPassword: z.string().min(6),
    newPassword: z.string().min(6),
  }),
};

export default userSchema;
