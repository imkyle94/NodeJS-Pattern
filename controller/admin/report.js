import { logger } from "../../utils/logger.js";

import moment from "moment";

import {
  successResponse,
  errorResponse,
  errorHandler,
} from "../../utils/response.js";

import {
  checkReportByReportNumber,
  fetchReportRecord,
  fetchRecentReportRecord,
} from "../../services/admin/report.js";

import {
  fetchDetectionDateReportRecord,
  fetchReporterNameReportRecord,
  fetchCarNumberReportRecord,
  fetchReportNumberReportRecord,
  fetchProcessingStatusReportRecord,
  fetchQueryReportRecord,
} from "../../services/admin/reportSearchQuery.js";

import {
  ERROR_MESSAGE,
  SUCCESS_MESSAGE,
  HTTP_STATUS_CODE,
  REQ_HEADER,
} from "../../utils/constants.js";

/**
 * fetchReport function
 * @param {object} request - HTTPS request
 * @param {object} response - HTTPS response
 * @returns {object} HTTPS response
 */
export const fetchReport = async (request, response) => {
  try {
    // const token = request.header(REQ_HEADER.X_AUTH_TOKEN);

    // // Verify Token
    // const verifiedToken = await verifyJws(token);
    // console.log(verifiedToken);
    // if (!verifiedToken.isSuccess) {
    //   return response
    //     .status(HTTP_STATUS_CODE.UNAUTHORIZED)
    //     .json(errorResponse("fetchUser : " + ERROR_MESSAGE.INVALID_TOKEN));
    // }

    // // Decrypt Jwe Token
    // const decryptedData = await decryptJwe(verifiedToken.data);
    // const phoneNumber = decryptedData.data.phoneNumber;
    // const email = decryptedData.data.email;

    // const reportNumber = request.body.reportNumber;

    const phoneNumber = "010-1234-5678";
    const email = "asd@naver.com";

    const reportNumber = request.body.reportNumber;

    const data = {
      // phoneNumber: phoneNumber,
      // email: email,
      reportNumber: reportNumber,
    };

    logger.info("fetchReport start \n\n");
    logger.info("data : " + JSON.stringify(data));

    const findReportResponse = await fetchReportRecord(data);

    if (!findReportResponse.isSuccess) {
      return response
        .status(HTTP_STATUS_CODE.INTERNAL_SERVER)
        .json(errorResponse(findReportResponse.data));
    } else {
      return response
        .status(HTTP_STATUS_CODE.OK)
        .json(successResponse(findReportResponse));
    }
  } catch (err) {
    errorHandler(err, response);
  }
};

/**
 * fetchRecentReport function
 * @param {object} request - HTTPS request
 * @param {object} response - HTTPS response
 * @returns {object} HTTPS response
 */
export const fetchRecentReport = async (request, response) => {
  try {
    // const token = request.header(REQ_HEADER.X_AUTH_TOKEN);

    // // Verify Token
    // const verifiedToken = await verifyJws(token);
    // console.log(verifiedToken);
    // if (!verifiedToken.isSuccess) {
    //   return response
    //     .status(HTTP_STATUS_CODE.UNAUTHORIZED)
    //     .json(errorResponse("fetchUser : " + ERROR_MESSAGE.INVALID_TOKEN));
    // }

    // // Decrypt Jwe Token
    // const decryptedData = await decryptJwe(verifiedToken.data);
    // const phoneNumber = decryptedData.data.phoneNumber;
    // const email = decryptedData.data.email;

    // const data = {
    //   phoneNumber: phoneNumber,
    //   email: email,
    // };

    logger.info("fetchRecentReport start \n\n");
    // logger.info("data : " + JSON.stringify(data));

    const findRecentReportResponse = await fetchRecentReportRecord();

    if (!findRecentReportResponse.isSuccess) {
      return response
        .status(HTTP_STATUS_CODE.INTERNAL_SERVER)
        .json(errorResponse(findRecentReportResponse.data));
    } else {
      return response
        .status(HTTP_STATUS_CODE.OK)
        .json(successResponse(findRecentReportResponse));
    }
  } catch (err) {
    errorHandler(err, response);
  }
};

/**
 * fetchReportQuery function
 * @param {object} request - HTTPS request
 * @param {object} response - HTTPS response
 * @returns {object} HTTPS response
 */
export const fetchReportQuery = async (request, response) => {
  try {
    // const token = request.header(REQ_HEADER.X_AUTH_TOKEN);

    // // Verify Token
    // const verifiedToken = await verifyJws(token);
    // console.log(verifiedToken);
    // if (!verifiedToken.isSuccess) {
    //   return response
    //     .status(HTTP_STATUS_CODE.UNAUTHORIZED)
    //     .json(errorResponse("fetchUser : " + ERROR_MESSAGE.INVALID_TOKEN));
    // }

    // // Decrypt Jwe Token
    // const decryptedData = await decryptJwe(verifiedToken.data);
    // const phoneNumber = decryptedData.data.phoneNumber;
    // const email = decryptedData.data.email;

    // const reportNumber = request.body.reportNumber;

    const phoneNumber = "010-1234-5678";
    const email = "asd@naver.com";

    const reportNumber = "3";

    // const reportQuery = request.body.reportQuery;

    // const reportQuery = {
    //   query: "detectionDate",
    //   data: { startDate: "2022-07-10", endDate: "2022-08-16" },
    // };

    const data = {
      phoneNumber: phoneNumber,
      email: email,
      reportNumber: reportNumber,
    };

    logger.info("fetchReportQuery start \n\n");
    logger.info("data : " + JSON.stringify(data));

    const reportQuery = [
      {
        query: "detectionDate",
        data: { startDate: "2020-07-10", endDate: "2022-08-16" },
      },
      {
        query: "reporterName",
        data: { reporterName: "Alex" },
      },
    ];

    let query = "";
    // 저수준 쿼리
    const abc = reportQuery.map(async (data) => {
      switch (data.query) {
        case "detectionDate":
          //   const Op = Sequelize .Op;

          const startDate = moment(new Date(data.data.startDate)).format(
            "YYYY-MM-DD"
          );
          const endDate = moment(new Date(data.data.endDate)).format(
            "YYYY-MM-DD"
          );

          query += `${data.query} >= "${startDate}" AND ${data.query} <= "${endDate}" AND `;

          break;

        default:
          const value = Object.values(data.data);
          query += `${data.query} = "${value[0]}" AND `;
      }
    });

    await Promise.all(abc);

    const data2 = query.slice(0, query.length - 5);

    const findReportQueryResponse = await fetchQueryReportRecord(data2);

    if (!findReportQueryResponse.isSuccess) {
      return response
        .status(HTTP_STATUS_CODE.INTERNAL_SERVER)
        .json(errorResponse(findReportQueryResponse.data));
    } else {
      return response
        .status(HTTP_STATUS_CODE.OK)
        .json(successResponse(findReportQueryResponse));
    }
  } catch (err) {
    errorHandler(err, response);
  }
};
