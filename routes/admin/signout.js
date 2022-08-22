import express from "express";

const signoutRouter = express.Router();

import { verifyJws } from "../../utils/jsonToken.js";

/**
 * @swagger
 * /api/signout:
 *  get:
 *    summary: User Log-out
 *    tags:
 *      - KOR_API
 *    responses:
 *      200:
 *        description: Success Sign-out
 *      400:
 *        description: Bad Request
 *      401:
 *        description: Token Expired or Unauthorized
 */
signoutRouter.get("/", async (req, res, next) => {
  try {
    if (!req.cookies.user && !req.header("x-auth-token")) {
      res.status(400).json({ message: "Bad Request : Please Sign-in" });
    } else {
      const token = req.cookies.user
        ? req.cookies.user
        : req.header("x-auth-token");
      const verifiedToken = await verifyJws(token);

      if (!verifiedToken.isSuccess) {
        res.status(401).json({ message: "Unauthorized" });
      } else
        res
          .clearCookie("user")
          .status(200)
          .json({ message: "Success Sign-out" });
    }
  } catch (error) {
    res.status(401).json({ message: "Token Expired" });
  }
});

export { signoutRouter };
