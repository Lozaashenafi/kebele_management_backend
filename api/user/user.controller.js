import { prisma } from "../../config/prisma.js";
import { JWT_SECRATE } from "../../config/secrate.js";
import userSchema from "./user.schema.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userController = {
  register: async (req, res, next) => {
    //validate
    userSchema.register.parse(req.body);
    // check if the email and phone register
    const existingUser = await prisma.users.findFirst({
      where: {
        OR: [{ email: req.body.email }],
      },
    });
    if (existingUser) {
      return res.status(403).json({
        message: "email or phone is related with an existing account",
        success: false,
      });
    }
    //check if kebele, kebele mender exist before
    // encrypt password
    const password = bcrypt.hashSync(req.body.password, 10);

    // start creating
    const newUser = await prisma.users.create({
      data: {
        email: req.body.email,
        phone: req.body.phone,
        role: req.body.role,
        password: password,
        profile: {
          create: {
            firstName: req.body.firstName,
            middleName: req.body.middleName,
            lastName: req.body.lastName,
            gender: req.body.gender,
          },
        },
      },
    });
    // If user is created successfully, return success response
    return res.status(201).json({
      message: "User created successfully",
      user: newUser,
      success: true,
    });
  },
  getAllManager: async (req, res, next) => {
    const managers = await prisma.users.findMany({
      where: { role: "MANAGER" },
    });
    console.log(managers);
    return res.status(200).json({
      success: true,
      data: managers,
      message: "sucessfully fetch",
    });
  },
  getAllSecretary: async (req, res, next) => {
    const secretary = await prisma.users.findMany({
      where: { role: "SECRATERY" },
    });
    console.log(secretary);
    return res.status(200).json({
      success: true,
      data: secretary,
      message: "sucessfully fetch",
    });
  },
  update: async (req, res, next) => {
    try {
      // Extract necessary data from request
      const { id } = req.params;
      const {
        email,
        phone,
        password,
        firstName,
        middleName,
        lastName,
        gender,
        imageUrl,
      } = req.body;

      // Check if user exists
      const existingUser = await prisma.users.findUnique({
        where: { id: parseInt(id) },
      });

      if (!existingUser) {
        return res
          .status(404)
          .json({ message: "User not found", success: false });
      }

      // Update user data
      const updatedUser = await prisma.users.update({
        where: { id: parseInt(id) },
        data: {
          email: email || existingUser.email, // Use existing email if not provided in the request
          phone: phone || existingUser.phone, // Use existing phone if not provided in the request
          password: password
            ? bcrypt.hashSync(password, 10)
            : existingUser.password, // Hash password if provided
          profile: {
            update: {
              firstName: firstName || existingUser.profile?.firstName, // Use existing firstName if not provided in the request
              middleName: middleName || existingUser.profile?.middleName, // Use existing middleName if not provided in the request
              lastName: lastName || existingUser.profile?.lastName, // Use existing lastName if not provided in the request
              gender: gender || existingUser.profile?.gender, // Use existing gender if not provided in the request
              imageUrl: imageUrl || existingUser.profile?.imageUrl, // Use existing imageUrl if not provided in the request
            },
          },
        },
      });

      return res
        .status(200)
        .json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
      console.error("Error updating user:", error);
      return res
        .status(500)
        .json({ message: "Internal server error", success: false });
    }
  },
  delete: async (req, res, next) => {
    try {
      // Extract the user ID from the request parameters
      const { id } = req.params;

      // Ensure that id is a valid integer before calling findUnique()
      const userId = parseInt(id);
      if (isNaN(userId)) {
        return res
          .status(400)
          .json({ message: "Invalid user ID", success: false });
      }

      const existingUser = await prisma.users.findUnique({
        where: { id: userId },
      });

      // If the user doesn't exist, return a 404 Not Found response
      if (!existingUser) {
        return res
          .status(404)
          .json({ message: "User not found", success: false });
      }

      // Delete the user
      await prisma.users.delete({
        where: { id: userId },
      });

      // Return a success message
      return res
        .status(200)
        .json({ message: "User deleted successfully", success: true });
    } catch (error) {
      // If an error occurs during the deletion process, return a 500 Internal Server Error response
      console.error("Error deleting user:", error);
      return res
        .status(500)
        .json({ message: "Internal server error", success: false });
    }
  },
  login: async (req, res, next) => {
    console.log(req.body);
    try {
      const { email, password } = req.body;

      // Check if the user exists
      const userExist = await prisma.users.findFirst({
        where: { email },
        include: {
          profile: true,
        },
      });

      if (!userExist) {
        return res
          .status(401)
          .json({ success: false, message: "User does not exist" });
      }

      // Check if the password matches
      const isMatch = await bcrypt.compareSync(password, userExist.password);
      if (!isMatch) {
        return res
          .status(401)
          .json({ success: false, message: "Incorrect password" });
      }

      // Prepare token
      const token = jwt.sign(
        {
          id: userExist.id,
          role: userExist.role,
          firstName: userExist.profile.firstName,
        },
        JWT_SECRATE
      );

      res.status(200).json({
        success: true,
        message: "Login successful",
        token,
      });
    } catch (error) {
      console.error("Error during login:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
  changePassword: async (req, res, next) => {
    try {
      // Retrieve user ID from authentication token or session
      const { id } = req.params; // Assuming you have middleware to authenticate users and attach their ID to the request

      // Retrieve user from the database
      const user = await prisma.users.findUnique({
        where: {
          id: parseInt(id),
        },
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      // Verify current password
      if (req.body.currentPassword !== user.password) {
        return res.status(401).json({
          success: false,
          message: "Current password is incorrect",
        });
      }

      // Update user's password in the database
      await prisma.users.update({
        where: {
          id: parseInt(id),
        },
        data: {
          password: req.body.newPassword,
        },
      });
      return res.status(200).json({
        success: true,
        message: "Password changed successfully",
      });
    } catch (error) {
      console.error("Error changing password:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },
};
export default userController;
