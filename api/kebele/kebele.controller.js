import { prisma } from "../../config/prisma.js";
import kebeleSchema from "./kebele.schema.js";
const kebeleController = {
  register: async (req, res, next) => {
    console.log(req);
    kebeleSchema.register.parse(req.body);

    const existingKebele = await prisma.kebeles.findFirst({
      where: {
        OR: [{ name: req.body.name }],
      },
    });
    if (existingKebele) {
      return res.status(403).json({
        message: "kebele existed  ",
        success: false,
      });
    }
    const newKebele = await prisma.kebeles.create({
      data: {
        name: req.body.name,

        address: {
          create: {
            region: req.body.region,
            wereda: req.body.wereda,
            city: req.body.city,
            zone: req.body.zone,
          },
        },
      },
    });
    return res.status(200).json({
      success: true,
      message: "kebele added sucessfully",
      data: newKebele,
    });
  },
  getAll: async (req, res, next) => {
    const kebele = await prisma.kebeles.findMany({
      include: {
        _count: true,
        address: true,
      },
    });

    return res.status(200).json({
      success: true,
      data: kebele,
      message: "sucessfully fetch",
    });
  },
  delete: async (req, res, next) => {
    // console.log("object");
    const id = req.params.id;
    console.log(id);
    const kebele = await prisma.kebeles.delete({
      where: {
        id: +id,
      },
    });

    return res.status(200).json({
      success: true,
      message: "sucessfully deleted",
    });
  },
  update: async (req, res, next) => {
    const id = req.params.id;
    kebeleSchema.register.parse(req.body);
    const existingKebele = await prisma.kebeles.findFirst({
      where: {
        id: +id,
      },
    });
    if (existingKebele) {
      const updatedKebele = await prisma.kebeles.update({
        where: {
          id: +id,
        },
        data: {
          name: req.body.name,
          addressId: req.body.addressId,
          address: {
            update: {
              region: req.body.region,
              wereda: req.body.wereda,
              city: req.body.city,
              zone: req.body.zone,
            },
          },
        },
      });

      return res.status(200).json({
        success: true,
        message: "kebele updated sucessfully",
        data: updatedKebele,
      });
    }
    return res.status(400).json({
      success: fale,
      message: "kebele is not exist ",
    });
  },
};

export default kebeleController;
