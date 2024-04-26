import { prisma } from "../../config/prisma.js";
import kebeleSchema from "./kebele.schema.js";
const kebeleController = {
  register: async (req, res, next) => {
    kebeleSchema.register.parse(req.body);
    const existingKebele = await prisma.kebeles.findFirst({
      where: {
        OR: [{ name: req.body.name }, { addressId: req.body.addressId }],
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
        addressId: req.body.addressId,
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
    return res.status(200).json(newKebele);
  },
};

export default kebeleController;
