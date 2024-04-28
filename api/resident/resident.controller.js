import residentSchema from "./resident.schema.js";
import { prisma } from "../../config/prisma.js";
const residentController = {
  register: async (req, res, next) => {
    try {
      residentSchema.register.parse(req.body);
      console.log(req.body.idNumber);
      const existingResident = await prisma.residents.findFirst({
        where: {
          idNumber: req.body.idNumber,
        },
      });
      console.log(existingResident);
      if (existingResident) {
        return res.status(403).json({
          message: "you are already registerd",
          success: false,
        });
      }
      console.log("HJGFD");
      const newResident = await prisma.residents.create({
        data: {
          firstName: req.body.firstName,
          middleName: req.body.middleName,
          lastName: req.body.lastName,
          gender: req.body.gender,
          age: 11,
          homeNo: 11,
          idNumber: 333,
        },
      });
      return res.status(200).json(newResident);
    } catch (error) {
      return error;
    }
  },
  getAll: async (req, res, next) => {
    // console.log("gfdsd");
    const resident = await prisma.residents.findMany({});
    console.log(resident);
    return res.status(200).json({
      success: true,
      data: resident,
      message: "sucessfully fetch",
    });
  },
};
export default residentController;
