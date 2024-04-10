import { z } from "zod";

const userSchema = {
  register: z.object({
    email: z.string().email(),
    password: z.string().min(6),
    phone: z.string().max(14),
    kebeleId: z.number(),
    adressId: z.number(),
    kebeleMenderId: z.number(),
    firstName: z.string(),
    middleName: z.string(),
    lastName: z.string(),
    imageUrl: z.string(),
    gender: z.enum(["MALE", "FEMALE"]),
  }),
  update: z.object(),
};

export default userSchema;
