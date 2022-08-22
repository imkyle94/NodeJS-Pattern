import express from "express";

import * as adminControllers from "../../controller/admin/admin.js";

const adminRouter = express.Router();

adminRouter.get("/", (req, res, next) => {
  // for index page rendering test
  res.render("a", { title: "test" });
});
// router.post("/add", addAdmin);
adminRouter.post("/login", adminControllers.login);

export { adminRouter };

// const { checkPermission } = require("../../utils/checkPermission");
