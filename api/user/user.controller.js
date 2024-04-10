import { prisma } from "../../config/prisma.js";
import userSchema from "./user.schema.js";
import bcypt from "bcrypt";
const userController = {
  register: async (req, res, next) => {
    // console.log(req.query.take);
    // console.log(req.query.skip);
    // console.log(req.params.id);
    // console.log(req.body);
    //validate
    userSchema.register.parse(req.body);
    // check if the email and phone register
    const existingUser = await prisma.users.findFirst({
      where: {
        OR: [{ email: req.body.email }, { phone: req.body.phone }],
      },
    });
    if (existingUser) {
      return res.status(403).json({
        message: "email or phone is related with existing account",
        success: false,
      });
    }
    //check if kebele ,adress , kebele mender exist befor
    //encript password
    const password = bcypt.hashSync(req.body.password, 10);

    // start creting
    const newUser = await prisma.users.create({
      data: {
        email: req.body.email,
        phone: req.body.phone,
        password: password,
        kebeleId: req.body.kebeleId,
        kebeleMenderId: req.body.kebeleMenderId,
        profile: {
          create: {
            firstName: req.body.firstName,
            middleName: req.body.middleName,
            lastName: req.body.lastName,
            gender: req.body.gender,
            imageUrl: req.body.imageUrl,
          },
        },
      },
    });
    return res.status(200).json(newUser);
  },
};
export default userController;
