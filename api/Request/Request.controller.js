import { prisma } from "../../config/prisma.js";
import RequestSchema from "./Request.schema.js";
const RequestController = {
  idrequest: async (req, res, next) => {
    console.log(res);
    try {
      RequestSchema.idrequest.parse(req.body);

      const existingRequest = await prisma.idRequests.findFirst({
        where: {
          OR: [{ email: req.body.email }, { phone: req.body.phone }],
        },
      });

      if (existingRequest) {
        return res.status(403).json({
          message: "You have already requested",
          success: false,
        });
      }
      const newRequest = await prisma.idRequests.create({
        data: {
          email: req.body.email,
          fullName: req.body.fullName,
          fatherFullName: req.body.fatherFullName,
          motherFullName: req.body.motherFullName,
          birthDate: req.body.birthDate,
          gender: req.body.gender,
          houseNumber: req.body.houseNumber,
          workStatus: req.body.workStatus,
          nationality: req.body.nationality,
          houseLive: req.body.houseLive,
          phone: req.body.phone,
        },
      });

      return res.status(201).json({
        message: "ID request created successfully",
        request: newRequest,
        success: true,
      });
    } catch (error) {
      console.error("Error creating ID request:", error);
      return res
        .status(500)
        .json({ message: "Internal server error", success: false });
    }
  },
  birthRequests: async (req, res, next) => {
    try {
      RequestSchema.birthRequests.parse(req.body);

      const existingRequest = await prisma.birthRequests.findFirst({
        where: {
          OR: [{ email: req.body.email }, { idnumber: req.body.idnumber }],
        },
      });
      if (existingRequest) {
        return res.status(403).json({
          message: "You have already requested",
          success: false,
        });
      }
      const newRequest = await prisma.birthRequests.create({
        data: {
          email: req.body.email,
          fullName: req.body.fullName,
          middleName: req.body.middleName,
          lastName: req.body.lastName,
          motherFullName: req.body.motherFullName,
          houseNumber: req.body.houseNumber,
          idnumber: req.body.idnumber,
        },
      });

      return res.status(201).json({
        message: "birth request created successfully",
        request: newRequest,
        success: true,
      });
    } catch (error) {
      console.error("Error creating birth request:", error);
      return res
        .status(500)
        .json({ message: "Internal server error", success: false });
    }
  },
};
export default RequestController;
