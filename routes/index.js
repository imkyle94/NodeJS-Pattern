import express from "express";

import { adminRouter } from "./admin/admin.js";
import { userRouter } from "./user/user.js";
import { reportRouter } from "./user/report.js";

const indexRouter = express.Router();

indexRouter.get("/", (req, res, next) => {
  // for index page rendering test
  res.render("index", { title: "test" });
});

indexRouter.get("/login", (req, res, next) => {
  // for login page rendering test
  res.render("login", { title: "test" });
});

indexRouter.use("/admin", adminRouter);
indexRouter.use("/user", userRouter);
indexRouter.use("/report", reportRouter);

export { indexRouter };
