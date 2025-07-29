import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ErrorHandler, UnauthorizedError } from "../Helpers/ErrorHandler.js";

const JWT_SECRET = process.env.JWT_SECRET || "mi_clave_secreta";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    ErrorHandler.handle(new UnauthorizedError("Authorization header missing"), res);
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    ErrorHandler.handle(new UnauthorizedError("Token inválido o expirado"), res);
    return;
  }
};
