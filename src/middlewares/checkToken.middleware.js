import { request, response } from "express";
import { verifyToken } from "../utils/jw.js";

export const checkToken = async (req = request, res = response, next) => {
  try {
    const token = await req.cookies.token;
    if (!token)
      return res.status(401).json({ status: error, msg: "Token not provided" });

    const tokenVerify = verifyToken(token);
    if (!tokenVerify)
      return res.status(401).json({ status: "error", msg: "Invalid Token" });

    req.user = verifyToken;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", msg: "internal server error" });
  }
};