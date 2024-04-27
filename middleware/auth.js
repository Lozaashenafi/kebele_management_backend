import jwt from "jsonwebtoken";
import { prisma } from "../config/prisma.js";
import { JWT_SECRATE } from "../config/secrate.js";

const userAuth = async (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token);
  if (!token) {
    return res.status(403).json({
      message: "Token not found",
      success: false,
    });
  }
  try {
    const payload = await jwt.verify(token, JWT_SECRATE);
    console.log(payload);
    const user = await prisma.users.findFirst({
      where: {
        id: payload.id,
      },
    });
    if (!user) {
      return res.status(403).json({
        message: "User not found",
        success: false,
      });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({
      message: "Invalid token",
      success: false,
    });
  }
};

const isAdmin = async (req, res, next) => {
  const admin = req.user;
  if (admin && admin.role !== "ADMIN") {
    return res.status(403).json({
      message: "User not admin",
      success: false,
    });
  }
  next();
};

const isManager = async (req, res, next) => {
  const admin = req.user;
  if (admin && admin.role !== "MANAGER") {
    return res.status(403).json({
      message: "User not manager",
      success: false,
    });
  }
  next();
};
const isSecratory = async (req, res, next) => {
  const admin = req.user;
  if (admin && admin.role !== "SECRATERY") {
    return res.status(403).json({
      message: "User not manager",
      success: false,
    });
  }
  next();
};

export { userAuth, isAdmin, isManager, isSecratory };
