import { date } from "zod";
import { prisma } from "../../config/prisma.js";
import RequestSchema from "./Request.schema.js";
const RequestController = {
  idrequest: async (req, res, next) => {
    // console.log(res);
    try {
      // RequestSchema.idrequest.parse(req.body);

      const existingRequest = await prisma.idRequests.findFirst({
        where: {
          OR: [{ email: req.body.email }],
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
          fatherName: req.body.fatherName,
          motherName: req.body.motherName,
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
        message: "ID request submited successfully",
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
  getidrequest: async (req, res, next) => {
    try {
      const idrequests = await prisma.idRequests.findMany({});
      return res.status(200).json({
        success: true,
        data: idrequests,
        message: "sucessfully fetch",
      });
    } catch (error) {
      return res.status(200).json({
        success: false,
        data: error,
        message: "error",
      });
    }
  },

  birthrequests: async (req, res, next) => {
    try {
      RequestSchema.birthRequests.parse(req.body);
      console.log("ghfjf");
      const existingRequest = await prisma.birthRequests.findFirst({
        where: {
          OR: [{ email: req.body.email }],
        },
      });
      if (existingRequest) {
        return res.status(403).json({
          message: "You have already requested",
          success: false,
        });
      }

      const idnumber = parseInt(req.body.idnumber);
      //const houseNumber = parseInt(req.body.houseNumber);
      const newRequest = await prisma.birthRequests.create({
        data: {
          email: req.body.email,
          firstName: req.body.firstName,
          middleName: req.body.middleName,
          lastName: req.body.lastName,
          motherName: req.body.motherName,
          idnumber: idnumber,
        },
      });
      console.log(newRequest);
      return res.status(201).json({
        message: "birth request submited successfully",
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
  getbirthRequests: async (req, res, next) => {
    try {
      const birthRequests = await prisma.birthRequests.findMany({});
      return res.status(200).json({
        success: true,
        data: birthRequests,
        message: "sucessfully fetch",
      });
    } catch (error) {
      return res.status(200).json({
        success: false,
        data: error,
        message: "error",
      });
    }
  },
  approve: async (req, res, next) => {
    const id = req.params.id;
    // console.log(id);
    // RequestSchema.idrequest.parse(req.body);
    const existingRequest = await prisma.idRequests.findFirst({
      where: {
        id: +id,
      },
    });
    console.log(existingRequest);
    if (!existingRequest) {
      return res.status(200).json({
        success: false,
        message: "request not existed",
      });
    }
    const approveidRequest = await prisma.idRequests.update({
      where: {
        id: +id,
      },
      data: {
        approved: true,
      },
    });
    return res.status(200).json({
      success: true,
      message: "Approved by the Manager",
      data: approveidRequest,
    });
  },
};
export default RequestController;
