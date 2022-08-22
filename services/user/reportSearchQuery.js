import { sequelize } from "../../models/index.js";
import initModels from "../../models/init-models.js";
let models = initModels(sequelize);

import { logger } from "../../utils/logger.js";

import {
  ERROR_MESSAGE,
  REQ_HEADER,
  SUCCESS_MESSAGE,
  HTTP_STATUS_CODE,
  // HEADER_KEY_TOKEN,
  MESSAGES,
} from "../../utils/constants.js";

/**
 * Fetch Query report record
 * @param {object} data - "Fetch Query report record"
 * @returns {object}
 **/
export const fetchQueryReportRecord = async (data) => {
  let cond = data;

  logger.info("fetchQueryReportRecord data : " + JSON.stringify(data));

  try {
    let result;
    const queryReportRecord = await sequelize
      .query(`SELECT * FROM report WHERE ${cond}`, {})
      .then(([results, metadata]) => {
        result = results;
      });

    if (!result) {
      // 추가해야함
      return { isSuccess: false, data: ERROR_MESSAGE.REPORT_NUMBER_NOT_EXIST };
    } else {
      // 데이터 정제 필요하면 여기서
      return { isSuccess: true, data: result };
    }
  } catch (err) {
    logger.error(ERROR_MESSAGE.FETCHING_USER_ERROR + err);
    return { isSuccess: false, data: err };
  }
};
