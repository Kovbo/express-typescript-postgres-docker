import { Request, Response, NextFunction } from "express";

const errorHandlerMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res
    .status(500)
    .json({ message: "Something went wrong, please try again", error: err });
};

export default errorHandlerMiddleware;
