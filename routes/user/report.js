import express from "express";

import * as reportControllers from "../../controller/user/report.js";

const reportRouter = express.Router();

reportRouter.get("/", reportControllers.fetchRecentReport);

reportRouter.post("/add", reportControllers.addReport);

reportRouter.post("/fetchReport", reportControllers.fetchReport);

reportRouter.post("/fetchReportQuery", reportControllers.fetchReportQuery);

export { reportRouter };
