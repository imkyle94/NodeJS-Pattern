import { logger } from "../../utils/logger.js";

import moment from "moment";

import {
  successResponse,
  errorResponse,
  errorHandler,
} from "../../utils/response.js";

import {
  registerReport,
  checkReportByReportNumber,
  fetchReportRecord,
  fetchRecentReportRecord,
  // updateUserRecord,
  // fetchPasswordRecord,
} from "../../services/user/report.js";

import { fetchQueryReportRecord } from "../../services/user/reportSearchQuery.js";

import {
  ERROR_MESSAGE,
  SUCCESS_MESSAGE,
  HTTP_STATUS_CODE,
  REQ_HEADER,
} from "../../utils/constants.js";

import { uploadImage } from "../../utils/multer.js";

/**
 * addReport function
 * @param {object} request - HTTPS request
 * @param {object} response - HTTPS response
 * @returns {object} HTTPS response
 */
export const addReport = async (request, response) => {
  try {
    uploadImage(request, response, async function (err) {
      // console.log(request.files);

      // //CHECK IF DATA IS PROVIDED
      if (
        !("reportNumber" in request.body) ||
        !("reporterName" in request.body) ||
        !("carNumber" in request.body) ||
        !("detectionDate" in request.body) ||
        !("location" in request.body) ||
        !("transactionId" in request.body) ||
        !("IPFSaddress" in request.body) ||
        !("registraionDate" in request.body) ||
        !("imageMetadata" in request.body) ||
        !("imageFiles" in request.body) ||
        !(request.body.reportNumber != "") ||
        !(request.body.reporterName != "") ||
        !(request.body.carNumber != "") ||
        !(request.body.detectionDate != "") ||
        !(request.body.location != "") ||
        !(request.body.transactionId != "") ||
        !(request.body.IPFSaddress != "") ||
        !(request.body.registraionDate != "") ||
        !(request.body.imageMetadata != "") ||
        !(request.body.imageFiles != "")
      ) {
        return response
          .status(HTTP_STATUS_CODE.BAD_REQUEST)
          .json(
            errorResponse(
              "addReport : " + ERROR_MESSAGE.REQUIRED_PARAMETERS_MISSING
            )
          );
      }
      const counter = 0;

      const token = request.header(REQ_HEADER.X_AUTH_TOKEN);
      // Verify Token
      const verifiedToken = await verifyJws(token);
      if (!verifiedToken.isSuccess) {
        return response
          .status(HTTP_STATUS_CODE.UNAUTHORIZED)
          .json(errorResponse(ERROR_MESSAGE.INVALID_TOKEN));
      }

      // Decrypt Jwe Token
      const decryptedData = await decryptJwe(verifiedToken.data);
      const phoneNumber = decryptedData.data.phoneNumber;

      //Fetch the writer name through admin record
      const fetchWriter = await fetchAdminRecord({ phoneNumber });

      const fileUploadAddress = request.files.fileUpload;

      if (fileUploadAddress == undefined) {
        data = {
          phoneNumber: phoneNumber,
          writer: fetchWriter.data.name,
          title: request.body.title,
          description: request.body.description,
          registrationDate: moment().format(),
          //fileUpload: fileUploadAddress[0].location,
          //fileAddress: fileAddress,
          // modifier: null,
          // modifiedDate: null,
          publicStatus: request.body.publicStatus,
          lookUp: 0,
          topFix: request.body.topFix,
        };
      } else {
        var extContract = path.extname(fileUploadAddress[0].location);
        console.log("extContract" + " " + extContract);

        if (
          extContract != ".png" &&
          extContract != ".jpg" &&
          extContract != ".pdf"
        ) {
          return response
            .status(HTTP_STATUS_CODE.INTERNAL_SERVER)
            .json(errorResponse(ERROR_MESSAGE.FILE_ERROR));
        }
        // data = {
        //   phoneNumber: phoneNumber,
        //   writer: fetchWriter.data.name,
        //   title: request.body.title,
        //   description: request.body.description,
        //   registrationDate: moment().format(),
        //   fileUpload: fileUploadAddress[0].location,
        //   //fileAddress: fileAddress,
        //   // modifier: null,
        //   // modifiedDate: null,
        //   publicStatus: request.body.publicStatus,
        //   lookUp: 0,
        //   topFix: request.body.topFix,
        // };
      }

      const data = {
        reportNumber: request.body.reportNumber,
        reporterName: request.body.reporterName,
        carNumber: request.body.carNumber,
        detectionDate: request.body.detectionDate,
        location: request.body.location,
        transactionId: request.body.transactionId,
        IPFSaddress: request.body.IPFSaddress,
        registraionDate: request.body.registraionDate,
        imageMetadata: request.body.imageMetadata,
        imageFiles: request.body.imageFiles,
        counter: counter,

        registration: 0,
        lastConnection: moment().format(),
      };

      // 유효성 검사를 여기서 하던지 프론트에서 하던지

      // Check report does exist or not inside DB
      const reportNumber = request.body.reportNumber;
      const email = request.body.email;

      logger.info("addReport start \n\n");
      logger.info("reportInfo : " + JSON.stringify(data));

      // reportNumber로 중복 체크
      const searchData = { reportNumber: reportNumber };

      const checkReportResponse = await checkReportByReportNumber(searchData);

      if (!checkReportResponse.isSuccess) {
        return response
          .status(HTTP_STATUS_CODE.INTERNAL_SERVER)
          .json(errorResponse(ERROR_MESSAGE.INTERNAL_SERVER_ERROR));
      }

      if (checkReportResponse.data) {
        console.log(HTTP_STATUS_CODE.INTERNAL_SERVER);
        return response
          .status(HTTP_STATUS_CODE.INTERNAL_SERVER)
          .json(errorResponse(ERROR_MESSAGE.ALREADY_EXIST));
      }

      const result = await registerReport(data);

      if (!result._id) {
        return response
          .status(HTTP_STATUS_CODE.INTERNAL_SERVER)
          .json(errorResponse("신고 등록 오류"));
      }

      logger.info(
        "addReport registerReport result : " + JSON.stringify(result)
      );

      // 사건 정보에 대한 블록체인 데이터 관련 구성은 추후에 여쭤보고 진행
      // const agentName = data.name + data.phoneNumber;
      // const hashedAgentName = crypto.createHash(agentName);

      // const modifiedAgentName = "a" + hashedAgentName.slice(0, 3);
      // const DIDdata = {
      //   username: result._id.toString(),
      //   password: request.body.password,
      //   agentRole: "holder",
      //   agentName: modifiedAgentName,
      // };

      // logger.info("DIDdata", DIDdata);

      // const didResult = await createUserDID(DIDdata);

      // if (didResult.status == "success") {
      //   setTimeout(async function () {
      //     const fetchDID = await getDid(didResult.token);

      //     if (fetchDID.status == "success") {
      //       // db update with registration code 1
      //       const phoneNumber = request.body.phoneNumber;
      //       const registration = 1;
      //       const data = {
      //         phoneNumber: phoneNumber,
      //         email: email,
      //         registration: 1,
      //         did: fetchDID.data.did,
      //       };
      //       const updateRegistration = await updateUserRecord(data);

      //       if (updateRegistration.isSuccess == true) {
      //         const data = { role: "tourist" };
      //         const utmResponse = await createUserUTM(didResult.token, data);

      //         if (utmResponse.status == "success") {
      //           // db update with resitration code 2
      //           const phoneNumber = request.body.phoneNumber;
      //           const registration = 2;
      //           const data = {
      //             phoneNumber: phoneNumber,
      //             email: email,
      //             registration: 2,
      //           };
      //           const updateUtmRegistration = await updateUserRecord(data);
      //         }
      //       }
      //     } else {
      //       return response
      //         .status(HTTP_STATUS_CODE.BAD_REQUEST)
      //         .json(errorResponse(ERROR_MESSAGE.UTM_REGISTRATION_FAILED));
      //     }
      //   }, 30 * 1000);
      // } else {
      //   return response
      //     .status(HTTP_STATUS_CODE.BAD_REQUEST)
      //     .json(errorResponse(ERROR_MESSAGE.DID_REGISTRATION_FAILED));
      // }

      return response.status(HTTP_STATUS_CODE.OK).json(successResponse(result));
    });
  } catch (err) {
    logger.error("addReport error : ", err);
    errorHandler(err, response);
  }
};

/**
 * fetchReport function
 * @param {object} request - HTTPS request
 * @param {object} response - HTTPS response
 * @returns {object} HTTPS response
 */
export const fetchReport = async (request, response) => {
  try {
    const token = request.header(REQ_HEADER.X_AUTH_TOKEN);

    // Verify Token
    const verifiedToken = await verifyJws(token);
    console.log(verifiedToken);
    if (!verifiedToken.isSuccess) {
      return response
        .status(HTTP_STATUS_CODE.UNAUTHORIZED)
        .json(errorResponse("fetchUser : " + ERROR_MESSAGE.INVALID_TOKEN));
    }

    // Decrypt Jwe Token
    const decryptedData = await decryptJwe(verifiedToken.data);
    const phoneNumber = decryptedData.data.phoneNumber;
    const email = decryptedData.data.email;

    const reportNumber = request.body.reportNumber;
    const data = {
      //  phone or userId
      // phoneNumber: phoneNumber,
      // userId: userId,
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
    const token = request.header(REQ_HEADER.X_AUTH_TOKEN);

    // Verify Token
    const verifiedToken = await verifyJws(token);
    console.log(verifiedToken);
    if (!verifiedToken.isSuccess) {
      return response
        .status(HTTP_STATUS_CODE.UNAUTHORIZED)
        .json(errorResponse("fetchUser : " + ERROR_MESSAGE.INVALID_TOKEN));
    }

    // Decrypt Jwe Token
    const decryptedData = await decryptJwe(verifiedToken.data);
    const phoneNumber = decryptedData.data.phoneNumber;
    const email = decryptedData.data.email;

    const data = {
      phoneNumber: phoneNumber,
      email: email,
    };

    logger.info("fetchRecentReport start \n\n");
    logger.info("data : " + JSON.stringify(data));

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
        data: { startDate: "2022-07-10", endDate: "2022-08-16" },
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

//only admin can add the notices, noticeId should be autogenerated.
const addNotice = async (request, response) => {
  try {
    upload(request, response, async function (err) {
      //CHECK IF DATA IS PROVIDED
      if (
        //!('writer' in request.body) ||
        !("title" in request.body) ||
        !("description" in request.body) ||
        // !('address' in request.body) ||
        // !('registrationDate' in request.body) ||
        !("publicStatus" in request.body) ||
        !("topFix" in request.body)
      ) {
        return response
          .status(HTTP_STATUS_CODE.BAD_REQUEST)
          .json(errorResponse(ERROR_MESSAGE.REQUIRED_PARAMETERS_MISSING));
      }

      const token = request.header(REQ_HEADER.X_AUTH_TOKEN);
      const fileUploadAddress = request.files.fileUpload;

      // var extContract = path.extname(fileUploadAddress[0].location);
      // console.log("extContract"+" "+ extContract)

      // if (

      // 	(extContract != '.png') && (extContract != '.jpg') && (extContract != '.pdf')

      // ) {
      // 	return response
      // 		.status(HTTP_STATUS_CODE.INTERNAL_SERVER)
      // 		.json(errorResponse(ERROR_MESSAGE.FILE_ERROR));
      // }

      // Verify Token
      const verifiedToken = await verifyJws(token);
      if (!verifiedToken.isSuccess) {
        return response
          .status(HTTP_STATUS_CODE.UNAUTHORIZED)
          .json(errorResponse(ERROR_MESSAGE.INVALID_TOKEN));
      }

      // Decrypt Jwe Token
      const decryptedData = await decryptJwe(verifiedToken.data);
      const phoneNumber = decryptedData.data.phoneNumber;

      //Fetch the writer name through admin record
      const fetchWriter = await fetchAdminRecord({ phoneNumber });

      let data;
      if (fileUploadAddress == undefined) {
        data = {
          phoneNumber: phoneNumber,
          writer: fetchWriter.data.name,
          title: request.body.title,
          description: request.body.description,
          registrationDate: moment().format(),
          //fileUpload: fileUploadAddress[0].location,
          //fileAddress: fileAddress,
          // modifier: null,
          // modifiedDate: null,
          publicStatus: request.body.publicStatus,
          lookUp: 0,
          topFix: request.body.topFix,
        };
      } else {
        var extContract = path.extname(fileUploadAddress[0].location);
        console.log("extContract" + " " + extContract);

        if (
          extContract != ".png" &&
          extContract != ".jpg" &&
          extContract != ".pdf"
        ) {
          return response
            .status(HTTP_STATUS_CODE.INTERNAL_SERVER)
            .json(errorResponse(ERROR_MESSAGE.FILE_ERROR));
        }

        data = {
          phoneNumber: phoneNumber,
          writer: fetchWriter.data.name,
          title: request.body.title,
          description: request.body.description,
          registrationDate: moment().format(),
          fileUpload: fileUploadAddress[0].location,
          //fileAddress: fileAddress,
          // modifier: null,
          // modifiedDate: null,
          publicStatus: request.body.publicStatus,
          lookUp: 0,
          topFix: request.body.topFix,
        };
      }

      //TOP FIX Functionality
      const fetchNoticeResponse = await fetchAllNoticeRec();
      const topFixCount = fetchNoticeResponse.data.filter(function (e) {
        return e.topFix == 1;
      });

      // only registered admin can write notice
      // check if writer's phone number exists
      const adminIdExists = await checkAdminRecord({
        phoneNumber: phoneNumber,
      });
      if (!adminIdExists.data) {
        return response
          .status(HTTP_STATUS_CODE.INTERNAL_SERVER)
          .json(errorResponse(ERROR_MESSAGE.WRITER_NOT_EXISTS));
      } else {
        //check title is not present already in DB
        // const checkNoticeResponse = await checkNoticeRecord({ title: data.title });
        // if (!checkNoticeResponse.isSuccess) {
        // 	return response
        // 		.status(HTTP_STATUS_CODE.INTERNAL_SERVER)
        // 		.json(errorResponse(ERROR_MESSAGE.INTERNAL_SERVER_ERROR));
        // }
        // if (checkNoticeResponse.data) {
        // 	return response
        // 		.status(HTTP_STATUS_CODE.INTERNAL_SERVER)
        // 		.json(errorResponse(ERROR_MESSAGE.ALREADY_EXIST));
        // }

        const fetchAdminResponse = await fetchAdminRecord({ phoneNumber });
        if (fetchAdminResponse.data.name == data.writer) {
          if (topFixCount.length < 5 || data.topFix == 0) {
            const noticeRecord = await registerNotice(data);

            //update admin's record with notice ID
            const updateNoticeIdData = {
              phoneNumber: phoneNumber,
              noticeId: noticeRecord.noticeId,
            };

            const adminRecord = await updateNoticeID(updateNoticeIdData);
            if (!adminRecord.isSuccess) {
              return response
                .status(HTTP_STATUS_CODE.INTERNAL_SERVER)
                .json(errorResponse(ERROR_MESSAGE.NOTICE_ID_UPDATE_ERROR));
            } else {
              return response
                .status(HTTP_STATUS_CODE.OK)
                .json(successResponse(noticeRecord));
            }
          } else {
            return response
              .status(HTTP_STATUS_CODE.INTERNAL_SERVER)
              .json(errorResponse(ERROR_MESSAGE.TOP_FIX_LIMIT));
          }
        } else {
          return response
            .status(HTTP_STATUS_CODE.INTERNAL_SERVER)
            .json(errorResponse(ERROR_MESSAGE.WRITER_NAME_NOT_MATCH));
        }
      }
    });
  } catch (err) {
    errorHandler(err, response);
  }
};
