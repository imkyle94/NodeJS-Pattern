import Sequelize from "sequelize";

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
 * Fetch detectiondate report record
 * @param {object} data - "Fetch detectiondate report record"
 * @returns {object}
 **/
export const fetchDetectionDateReportRecord = async (data) => {
  let cond = {
    startDate: new Date(data.startDate),
    endDate: new Date(data.endDate),
  };

  logger.info("fetchDetectionDateReportRecord data : " + JSON.stringify(data));

  try {
    const Op = Sequelize.Op;

    const detectionDateReportRecord = await models.report.findAll({
      where: {
        detectionDate: {
          [Op.between]: [cond.startDate, cond.endDate],
        },
      },
      //   order: [["_id", "DESC"]],
    });

    if (!detectionDateReportRecord) {
      // 추가해야함
      return { isSuccess: false, data: ERROR_MESSAGE.REPORT_NUMBER_NOT_EXIST };
    } else {
      // 데이터 정제 필요하면 여기서
      return { isSuccess: true, data: detectionDateReportRecord };
    }
  } catch (err) {
    logger.error(ERROR_MESSAGE.FETCHING_USER_ERROR + err);
    return { isSuccess: false, data: err };
  }
};

/**
 * Fetch reportername report record
 * @param {object} data - "Fetch reportername report record"
 * @returns {object}
 **/
export const fetchReporterNameReportRecord = async (data) => {
  let cond = { reporterName: data.reporterName };

  logger.info("fetchReporterNameReportRecord data : " + JSON.stringify(data));

  try {
    const Op = Sequelize.Op;

    const reporterNameReportRecord = await models.report.findAll({
      where: cond,
      //   order: [["_id", "DESC"]],
    });

    if (!reporterNameReportRecord) {
      // 추가해야함
      return { isSuccess: false, data: ERROR_MESSAGE.REPORT_NUMBER_NOT_EXIST };
    } else {
      // 데이터 정제 필요하면 여기서
      return { isSuccess: true, data: reporterNameReportRecord };
    }
  } catch (err) {
    logger.error(ERROR_MESSAGE.FETCHING_USER_ERROR + err);
    return { isSuccess: false, data: err };
  }
};

/**
 * Fetch carnumber report record
 * @param {object} data - "Fetch carnumber report record"
 * @returns {object}
 **/
export const fetchCarNumberReportRecord = async (data) => {
  let cond = { carNumber: data.carNumber };

  logger.info("fetchCarNumberReportRecord data : " + JSON.stringify(data));

  try {
    const Op = Sequelize.Op;

    const carNumberReportRecord = await models.report.findAll({
      where: cond,
      //   order: [["_id", "DESC"]],
    });

    if (!carNumberReportRecord) {
      // 추가해야함
      return { isSuccess: false, data: ERROR_MESSAGE.REPORT_NUMBER_NOT_EXIST };
    } else {
      // 데이터 정제 필요하면 여기서
      return { isSuccess: true, data: carNumberReportRecord };
    }
  } catch (err) {
    logger.error(ERROR_MESSAGE.FETCHING_USER_ERROR + err);
    return { isSuccess: false, data: err };
  }
};

/**
 * Fetch reportNumber report record
 * @param {object} data - "Fetch reportNumber report record"
 * @returns {object}
 **/
export const fetchReportNumberReportRecord = async (data) => {
  let cond = { reportNumber: data.reportNumber };

  logger.info("fetchReportNumberReportRecord data : " + JSON.stringify(data));

  try {
    const Op = Sequelize.Op;

    const reportNumberReportRecord = await models.report.findAll({
      where: cond,
      //   order: [["_id", "DESC"]],
    });

    if (!reportNumberReportRecord) {
      // 추가해야함
      return { isSuccess: false, data: ERROR_MESSAGE.REPORT_NUMBER_NOT_EXIST };
    } else {
      // 데이터 정제 필요하면 여기서
      return { isSuccess: true, data: reportNumberReportRecord };
    }
  } catch (err) {
    logger.error(ERROR_MESSAGE.FETCHING_USER_ERROR + err);
    return { isSuccess: false, data: err };
  }
};

/**
 * Fetch processingStatus report record
 * @param {object} data - "Fetch processingStatus report record"
 * @returns {object}
 **/
export const fetchProcessingStatusReportRecord = async (data) => {
  let cond = { processingStatus: data.processingStatus };

  logger.info(
    "fetchProcessingStatusReportRecord data : " + JSON.stringify(data)
  );

  try {
    const Op = Sequelize.Op;

    const processingStatusReportRecord = await models.report.findAll({
      where: cond,
      //   order: [["_id", "DESC"]],
    });

    if (!processingStatusReportRecord) {
      // 추가해야함
      return { isSuccess: false, data: ERROR_MESSAGE.REPORT_NUMBER_NOT_EXIST };
    } else {
      // 데이터 정제 필요하면 여기서
      return { isSuccess: true, data: processingStatusReportRecord };
    }
  } catch (err) {
    logger.error(ERROR_MESSAGE.FETCHING_USER_ERROR + err);
    return { isSuccess: false, data: err };
  }
};

/**
 * Fetch Query report record
 * @param {object} data - "Fetch Query report record"
 * @returns {object}
 **/
export const fetchQueryReportRecord = async (data) => {
  let cond = data;

  logger.info("fetchQueryReportRecord data : " + JSON.stringify(data));

  try {
    // 저수준 쿼리와 orm 를 같이 사용할 방법은 없나

    // ORM
    // const queryReportRecord = await models.report.findAll({
    //   where: cond,
    //   //   order: [["_id", "DESC"]],
    // });

    // Raw Query
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
