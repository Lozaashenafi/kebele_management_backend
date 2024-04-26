import { z } from "zod";

const userSchema = {
  register: z.object({
    email: z.string().email(),
    password: z.string().min(6),
    phone: z.string().max(14),
    firstName: z.string(),
    middleName: z.string(),
    lastName: z.string(),
    imageUrl: z.string(),
    gender: z.enum(["MALE", "FEMALE"]),
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
