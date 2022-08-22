import * as EmailValidator from "email-validator";

import * as crypto from "../../utils/crypto.js";

import { logger } from "../../utils/logger.js";

import moment from "moment";

import {
  createJwe,
  createJws,
  decryptJwe,
  verifyJws,
} from "../../utils/jsonToken.js";

import {
  successResponse,
  errorResponse,
  errorHandler,
} from "../../utils/response.js";

// import { createUserDID, getDid } from "../../services/middlelayer/midDid.js";
// import { createUserUTM } from "../../services/middlelayer/utm.js";
// import { loginMiddlelayer } from "../../services/middlelayer/middlelayer.js";

import {
  registerUser,
  fetchUserRecord,
  fetchUserLoginRecord,
  updateUserRecord,
  fetchPasswordRecord,
  checkUserByPhoneMail,
} from "../../services/user/user.js";

import { registerAccessLog } from "../../services/admin/admin.js";

import {
  ERROR_MESSAGE,
  SUCCESS_MESSAGE,
  HTTP_STATUS_CODE,
  REQ_HEADER,
} from "../../utils/constants.js";

import { korToUtc } from "../../utils/timeChanger.js";

export const dev = async (request, response) => {
  try {
    // 세션 임시
    const parseIp = (req) =>
      req.headers["x-forwarded-for"]?.split(",").shift() ||
      req.socket?.remoteAddress;

    const accessLogData = {
      accessDate: new Date(),
      sessionId: "010-1234-5678",
      accessType: "login",
      userId: "8888",
      userIP: parseIp(request),
    };

    const accessLog = await registerAccessLog(accessLogData);
    if (!accessLog.isSuccess) {
      logger.error(accessLog.data.message);
    }
    // 세션 임시 끝

    // 임시 토큰
    const middlelayerToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm90ZWN0ZWQiOiJleUpsYm1NaU9pSkJNalUyUjBOTklpd2lZV3huSWpvaVpHbHlJaXdpYTJsa0lqb2lObUpFVWxaZlNrZE5jVVpJZFhwUVZrWTVUM1p2YjNKWlRVcG9kMEZIVG5Oa1kwbzBNRzVPVEZwaWR5SjkiLCJpdiI6IkJ5MWxUeUdEeDNiVVpNa3oiLCJjaXBoZXJ0ZXh0IjoidmI5ZjRRTi1DYW5wRWdqeVNQZVBLN2hocmo4SnBHODZ6enptQlcxeWFONTlGaVVYcENxZlBBOFAyZTBaUktkNnZpMVFfclhaa3NuX2Y4TFNNRnlPVUViNDZnIiwidGFnIjoibWF6TVRCbFBXclhNWmV1Zjl3dGd3QSIsImlhdCI6MTY2MDI2NDk3NH0.A2ZQ91BBicuSEWvEGsH5A9bOJvjMF-0_oiH-LTzlFHw";

    // 1. Creating JWE
    const jweResponse = await createJwe({
      phoneNumber: "010-1234-5678",
      email: "q1qq11@naver.com",
      middlelayerToken: middlelayerToken,
    });

    if (!jweResponse.isSuccess) {
      return response
        .status(HTTP_STATUS_CODE.INTERNAL_SERVER)
        .json(errorResponse(ERROR_MESSAGE.INTERNAL_SERVER_ERROR));
    }

    const data = {
      phoneNumber: "010-1234-5678",
      email: "q1qq11@naver.com",
      lastConnection: moment().format(),
    };

    const updateRegistration = await updateUserRecord(data);

    const jwe = jweResponse.data;
    // 2. Signing JWE
    const token = createJws(jwe);

    logger.info(SUCCESS_MESSAGE.LOGIN);

    response.cookie(
      "user",
      { token: token },
      {
        httpOnly: true,
      }
    );

    return response
      .status(HTTP_STATUS_CODE.OK)
      .json(successResponse(SUCCESS_MESSAGE.LOGIN, { token: token }));
  } catch (err) {
    //logger.error(err.stack);
    errorHandler(err, response);
  }
};

export const registAccessLog = async (request, response) => {
  try {
    const parseIp = (request) =>
      request.headers["x-forwarded-for"]?.split(",").shift() ||
      request.socket?.remoteAddress;

    const accessLogData = {
      accessDate: korToUtc(new Date()),
      sessionId: "guestAccess",
      accessType: "access",
      userId: "guestAccess",
      userIP: parseIp(request),
    };

    const fetchUserResponse = await registerAccessLog(accessLogData);

    if (!fetchUserResponse.isSuccess) {
      return response
        .status(HTTP_STATUS_CODE.INTERNAL_SERVER)
        .json(errorResponse(fetchUserResponse.data));
    } else {
      return response
        .status(HTTP_STATUS_CODE.OK)
        .json(successResponse(fetchUserResponse));
    }
  } catch (err) {
    errorHandler(err, response);
  }
};

/**
 * addUser function
 * @param {object} request - HTTPS request
 * @param {object} response - HTTPS response
 * @returns {object} HTTPS response
 */
export const addUser = async (request, response) => {
  try {
    // //CHECK IF DATA IS PROVIDED
    if (
      !("phoneNumber" in request.body) ||
      !("name" in request.body) ||
      !("email" in request.body) ||
      !("password" in request.body) ||
      //!('age' in request.body) ||
      !("address" in request.body) ||
      !("gender" in request.body) ||
      !("importedService" in request.body) ||
      !("servicePlatform" in request.body) ||
      !(request.body.name != "") ||
      !(request.body.phoneNumber != "") ||
      !(request.body.password != "")
    ) {
      return response
        .status(HTTP_STATUS_CODE.BAD_REQUEST)
        .json(
          errorResponse(
            "addUser : " + ERROR_MESSAGE.REQUIRED_PARAMETERS_MISSING
          )
        );
    }
    const counter = 0;

    const data = {
      phoneNumber: request.body.phoneNumber,
      name: request.body.name,
      email: request.body.email,
      dob: request.body.dob,
      age: request.body.age,
      gender: request.body.gender,
      address: request.body.address,
      importedService: request.body.importedService,
      servicePlatform: request.body.servicePlatform,

      //email: request.body.email, email: 'email' in request.body? request.body.email : undefined,
      //dob: request.body.dob,
      password: request.body.password,
      counter: counter,
      //drivingLicense: request.body.drivingLicense,
      registration: 0,
      lastConnection: moment().format(),
    };

    //Input validation
    const emailValidator = EmailValidator.validate(request.body.email);
    if (!emailValidator) {
      return response
        .status(HTTP_STATUS_CODE.BAD_REQUEST)
        .json(errorResponse(ERROR_MESSAGE.INVALID_INPUT));
    }

    // Check user does exist or not inside DB
    const phoneNumber = request.body.phoneNumber;
    const email = request.body.email;

    logger.info("addUser start \n\n");
    logger.info("userInfo : " + JSON.stringify(data));

    // phoneNumber로 중복 체크
    const searchData = { phoneNumber: phoneNumber };

    const checkUserResponse = await checkUserByPhoneMail(searchData);
    if (!checkUserResponse.isSuccess) {
      return response
        .status(HTTP_STATUS_CODE.INTERNAL_SERVER)
        .json(errorResponse(ERROR_MESSAGE.INTERNAL_SERVER_ERROR));
    }

    if (checkUserResponse.data) {
      return response
        .status(HTTP_STATUS_CODE.INTERNAL_SERVER)
        .json(errorResponse(ERROR_MESSAGE.ALREADY_EXIST));
    }

    const result = await registerUser(data);

    // 일단 result.id result.userId로 변경해놈
    if (!result.userId) {
      return response
        .status(HTTP_STATUS_CODE.INTERNAL_SERVER)
        .json(errorResponse("사용자 등록 오류"));
    }

    logger.info("addUser registerUser result : " + JSON.stringify(result));

    const agentName = data.name + data.phoneNumber;
    const hashedAgentName = crypto.createHash(agentName);

    const modifiedAgentName = "a" + hashedAgentName.slice(0, 3);

    const DIDdata = {
      username: result._id.toString(),
      password: request.body.password,
      agentRole: "holder",
      agentName: modifiedAgentName,
    };

    logger.info("DIDdata", DIDdata);

    const didResult = await createUserDID(DIDdata);

    if (didResult.status == "success") {
      setTimeout(async function () {
        const fetchDID = await getDid(didResult.token);

        if (fetchDID.status == "success") {
          // db update with registration code 1
          const phoneNumber = request.body.phoneNumber;
          const registration = 1;
          const data = {
            phoneNumber: phoneNumber,
            email: email,
            registration: 1,
            did: fetchDID.data.did,
          };
          const updateRegistration = await updateUserRecord(data);

          if (updateRegistration.isSuccess == true) {
            const data = { role: "tourist" };
            const utmResponse = await createUserUTM(didResult.token, data);

            if (utmResponse.status == "success") {
              // db update with resitration code 2
              const phoneNumber = request.body.phoneNumber;
              const registration = 2;
              const data = {
                phoneNumber: phoneNumber,
                email: email,
                registration: 2,
              };
              const updateUtmRegistration = await updateUserRecord(data);
            }
          }
        } else {
          return response
            .status(HTTP_STATUS_CODE.BAD_REQUEST)
            .json(errorResponse(ERROR_MESSAGE.UTM_REGISTRATION_FAILED));
        }
      }, 30 * 1000);
    } else {
      return response
        .status(HTTP_STATUS_CODE.BAD_REQUEST)
        .json(errorResponse(ERROR_MESSAGE.DID_REGISTRATION_FAILED));
    }

    return response.status(HTTP_STATUS_CODE.OK).json(successResponse(result));
  } catch (err) {
    logger.error("addUser error : ", err);
    errorHandler(err, response);
  }
};

/**
 * Login function
 * @param {object} request - HTTPS request
 * @param {object} response - HTTPS response
 * @returns {object} HTTPS response
 */
export const login = async (request, response) => {
  try {
    // Check whether input is present or not
    if (!("userId" in request.body) || !("password" in request.body)) {
      return response
        .status(HTTP_STATUS_CODE.BAD_REQUEST)
        .json(
          errorResponse("login : " + ERROR_MESSAGE.REQUIRED_PARAMETERS_MISSING)
        );
    }
    const userId = request.body.userId;
    const password = request.body.password;

    // Hash password
    const hashedPassword = crypto.createHash(password);

    // Fetch user record
    const data = { userId: userId, password: hashedPassword };
    const fetchUserResponse = await fetchUserLoginRecord(data);

    logger.info("fetchUser info : " + JSON.stringify(fetchUserResponse));

    if (!fetchUserResponse.isSuccess) {
      return response
        .status(HTTP_STATUS_CODE.UNAUTHORIZED)
        .json(errorResponse(ERROR_MESSAGE.USER_NOT_EXISTS));
    } else if (fetchUserResponse.data === null) {
      return response
        .status(HTTP_STATUS_CODE.BAD_REQUEST)
        .json(errorResponse(ERROR_MESSAGE.USERNAME_PASSWORD_INCORRECT));
    }
    const user = fetchUserResponse.data;

    // 1. Creating JWE
    const jweResponse = await createJwe({
      userId: userId,
      // email: fetchUserResponse.data.email,
    });

    if (!jweResponse.isSuccess) {
      return response
        .status(HTTP_STATUS_CODE.INTERNAL_SERVER)
        .json(errorResponse(ERROR_MESSAGE.INTERNAL_SERVER_ERROR));
    }

    const jwe = jweResponse.data;
    // 2. Signing JWE
    const token = createJws(jwe);

    logger.info(SUCCESS_MESSAGE.LOGIN);

    // add accesslog
    const parseIp = (req) =>
      req.headers["x-forwarded-for"]?.split(",").shift() ||
      req.socket?.remoteAddress;

    const accessLogData = {
      accessDate: new Date(),
      sessionId: token,
      accessType: "userLogin",
      userId: fetchUserResponse.data.userId,
      userIP: parseIp(request),
    };
    const accessLog = await registerAccessLog(accessLogData);
    if (!accessLog.isSuccess) {
      logger.error(accessLog.data.message);
    }

    const updateRegistration = await updateUserRecord({
      userId: userId,
      // email: fetchUserResponse.data.email,
      lastConnection: moment().format(),
    });

    return response
      .status(HTTP_STATUS_CODE.OK)
      .json(successResponse(SUCCESS_MESSAGE.LOGIN, { token: token }));
  } catch (err) {
    //logger.error(err.stack);
    errorHandler(err, response);
  }
};

/**
 * LoginCheck function
 * @param {object} request - HTTPS request
 * @param string response - HTTPS response
 * @returns {object} HTTPS response
 */
export const loginCheck = async (request, response) => {
  try {
    // Check whether input is present or not
    if (!("phoneNumber" in request.body) || !("password" in request.body)) {
      return response
        .status(HTTP_STATUS_CODE.OK)
        .json(
          errorResponse(
            "loginCheck : " + ERROR_MESSAGE.REQUIRED_PARAMETERS_MISSING
          )
        );
    }
    const phoneNumber = request.body.phoneNumber;
    const password = request.body.password;

    logger.info("\n\nloginCheck start ");
    logger.info("phoneNumber : " + phoneNumber);

    // Hash password
    const hashedPassword = crypto.createHash(password);

    // Fetch user record
    const data = { phoneNumber: phoneNumber, password: hashedPassword };
    const fetchUserResponse = await fetchUserRecord(data);

    logger.info("fetchUser info : " + JSON.stringify(fetchUserResponse));

    if (!fetchUserResponse.isSuccess) {
      return response
        .status(HTTP_STATUS_CODE.UNAUTHORIZED)
        .json(errorResponse(ERROR_MESSAGE.USER_NOT_EXISTS));
    } else if (fetchUserResponse.data === null) {
      return response
        .status(HTTP_STATUS_CODE.BAD_REQUEST)
        .json(errorResponse(ERROR_MESSAGE.USERNAME_PASSWORD_INCORRECT));
    }
    const user = fetchUserResponse.data;

    const credentials = {
      username: user._id.toString(),
      password: password,
    };

    if (user.registration == 0 || user.registration == 1) {
      return response
        .status(HTTP_STATUS_CODE.INTERNAL_SERVER)
        .json({ status: "try", message: "try" });
    } else if (user.registration == 2) {
      const loginResponse = await loginMiddlelayer(credentials);
      if (loginResponse.status != "success") {
        logger.error("Middle Login Fail");

        return response
          .status(HTTP_STATUS_CODE.INTERNAL_SERVER)
          .json({ status: "fail", message: "fail" });
      }

      const middlelayerToken = loginResponse.data.token;

      // 1. Creating JWE
      const jweResponse = await createJwe({
        phoneNumber: phoneNumber,
        email: fetchUserResponse.data.email,
        middlelayerToken: middlelayerToken,
      });
      if (!jweResponse.isSuccess) {
        return response
          .status(HTTP_STATUS_CODE.INTERNAL_SERVER)
          .json(errorResponse(ERROR_MESSAGE.INTERNAL_SERVER_ERROR));
      }
      const data = {
        phoneNumber: phoneNumber,
        email: fetchUserResponse.data.email,
        lastConnection: moment().format(),
      };

      /*
			await updateUserRecord(data);

			const jwe = jweResponse.data;
			// 2. Signing JWE
			const token = createJws(jwe);
			logger.info(SUCCESS_MESSAGE.LOGIN);
			*/
      return response
        .status(HTTP_STATUS_CODE.OK)
        .json({ status: "success", message: "success" });
    }
  } catch (err) {
    logger.error(err.stack);
    errorHandler(err, response);
  }
};

/**
 * fetchUser function
 * @param {object} request - HTTPS request
 * @param {object} response - HTTPS response
 * @returns {object} HTTPS response
 */
export const fetchUser = async (request, response) => {
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

    const data = { phoneNumber: phoneNumber, email: email };

    logger.info("fetchUser start \n\n");
    logger.info("data : " + JSON.stringify(data));

    const findUserResponse = await fetchUserRecord(data);
    if (!findUserResponse.isSuccess) {
      return response
        .status(HTTP_STATUS_CODE.INTERNAL_SERVER)
        .json(errorResponse(findUserResponse.data));
    } else {
      return response
        .status(HTTP_STATUS_CODE.OK)
        .json(successResponse(findUserResponse));
    }
  } catch (err) {
    errorHandler(err, response);
  }
};
