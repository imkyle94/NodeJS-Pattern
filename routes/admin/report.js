import express from "express";

import * as reportControllers from "../../controller/admin/report.js";

const reportRouter = express.Router();

reportRouter.get("/", reportControllers.fetchRecentReport);

reportRouter.post("/fetchReport", reportControllers.fetchReport);

reportRouter.post("/fetchReportQuery", reportControllers.fetchReportQuery);

export { reportRouter };
