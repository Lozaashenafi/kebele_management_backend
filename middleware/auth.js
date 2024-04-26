import jwt from "jsonwebtoken";
import { prisma } from "../config/prisma.js";
import { JWT_SECRATE } from "../config/secrate.js";

const userAuth = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(403).json({
      message: "Token not found",
      success: true,
    });
  }
  try {
    const payload = await jwt.verify(token, SECRET);
    const user = await prisma.users.findFirst({
      where: {
        id: payload.id,
      },
    });
    if (!user) {
      return res.status(403).json({
        message: "User not found",
        success: true,
      });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({
      message: "Invalid token",
      success: true,
    });
  }
};

const isAdmin = async (req, res, next) => {
  const admin = req.user;
  if (admin && admin.role !== "ADMIN") {
    return res.status(403).json({
      message: "User not admin",
      success: true,
    });
  }
  next();
};

const isManager = async (req, res, next) => {
  const admin = req.user;
  if (admin && admin.role !== "MANAGER") {
    return res.status(403).json({
      message: "User not manager",
      success: true,
    });
  }
  next();
};
const isSecratory = async (req, res, next) => {
  const admin = req.user;
  if (admin && admin.role !== "SECRATERY") {
    return res.status(403).json({
      message: "User not manager",
      success: true,
    });
  }
  next();
};

export { userAuth, isAdmin, isManager, isSecratory };
