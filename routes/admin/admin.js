import express from "express";

import * as addAdmin from "../../controller/admin/admin.js";

const adminRouter = express.Router();

adminRouter.get("/", (req, res, next) => {
  // for index page rendering test
  res.render("index", { title: "test" });
});
// router.post("/add", addAdmin);
adminRouter.post("/login", addAdmin.login);

export { adminRouter };