import { prisma } from "../../config/prisma.js";
import { z } from "zod";
import bcrypt from "bcrypt";

const RequestSchema = {
  idrequest: z.object({
    email: z.string().email(),
    fullName: z.string(),
    fatherFullName: z.string(),
    motherFullName: z.string(),
    birthDate: z.string(),
    gender: z.string(),
    houseNumber: z.string(),
    workStatus: z.string(),
    nationality: z.string(),
    houseLive: z.string(),
    phone: z.number(),
  }),
  birthRequests: z.object({
    email: z.string().email(),
    fullName: z.string(),
    middleName: z.string(),
    lastName: z.string(),
    motherFullName: z.string(),
    houseNumber: z.string(),
    idnumber: z.string(),
  }),
};
export default RequestSchema;
