import express from "express";

import { adminRouter } from "./admin/admin.js";

const indexRouter = express.Router();

indexRouter.get("/", (req, res, next) => {
  // for index page rendering test
  res.render("index", { title: "test" });
});

indexRouter.use("/admin", adminRouter);

export { indexRouter };
