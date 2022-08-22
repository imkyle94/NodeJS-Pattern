import express from "express";

import { signoutRouter } from "./user/signout.js";
import { reportRouter } from "./admin/report.js";

const apiRouter = express.Router();

apiRouter.use("/signout", signoutRouter);
apiRouter.use("/admin/report", reportRouter);

export { apiRouter };
