import { z } from "zod";
const residentSchema = {
  register: z.object({
    firstName: z.string(),
    middleName: z.string(),
    lastName: z.string(),
    gender: z.string(),
    age: z.number(),
    homeNo: z.number(),
    idNumber: z.number(),
  }),
};
export default residentSchema;
