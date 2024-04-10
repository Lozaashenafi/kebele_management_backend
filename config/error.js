import express from "express";

export const errorHandler = (method) => {
  return async (req, res, next) => {
    try {
      await method(req, res, next);
    } catch (error) {
      res.status(500).json({
        message: `server error ${error.message}`,
      });
    }
  };
};
