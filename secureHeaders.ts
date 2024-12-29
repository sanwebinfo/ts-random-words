import { Request, Response, NextFunction } from "express";

export const setSecureHeaders = (req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Strict-Transport-Security", "max-age=63072000");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader("Referrer-Policy", "no-referrer-when-downgrade");
  res.setHeader("X-Robots-Tag", "noindex, nofollow");
  next();
};