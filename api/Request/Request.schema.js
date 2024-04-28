import { prisma } from "../../config/prisma.js";
import { z } from "zod";
import bcrypt from "bcrypt";

const RequestSchema = {
  idrequest: z.object({
    email: z.string().email(),
    fullName: z.string(),
    fatherName: z.string(),
    motherName: z.string(),
    birthDate: z.string(),
    gender: z.string(),
    houseNumber: z.number(),
    workStatus: z.string(),
    nationality: z.string(),
    houseLive: z.string(),
    phone: z.number(),
  }),
  birthRequests: z.object({
    email: z.string().email(),
    firstName: z.string(),
    middleName: z.string(),
    lastName: z.string(),
    motherName: z.string(),
    idnumber: z.number(),
  }),
};
export default RequestSchema;
