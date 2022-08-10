import emailvalidator from "email-validator";

import * as crypto from "../../utils/crypto.js";

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

import {
  registerAdmin,
  checkAdminRecord,
  fetchAdminLoginRecord,
  registerAccessLog,
  updateAdminRecord,
} from "../../services/admin/admin.js";

import {
  ERROR_MESSAGE,
  SUCCESS_MESSAGE,
  HTTP_STATUS_CODE,
  REQ_HEADER,
} from "../../utils/constants.js";

/**
 * addAdmin function
 * @param {object} request - HTTPS request
 * @param {object} response - HTTPS response
 * @returns {object} HTTPS response
 */

export const addAdmin = async (request, response) => {
  try {
    //CHECK IF DATA IS PROVIDED
    if (
      !("userId" in request.body) ||
      !("phoneNumber" in request.body) ||
      !("name" in request.body) ||
      !("email" in request.body) ||
      !("password" in request.body) ||
      !("role" in request.body) ||
      !("accountStatus" in request.body) ||
      !("company" in request.body) ||
      !(request.body.name != "") ||
      !(request.body.userId != "") ||
      !(request.body.phoneNumber != "")
    ) {
      return response
        .status(HTTP_STATUS_CODE.BAD_REQUEST)
        .json(errorResponse(ERROR_MESSAGE.REQUIRED_PARAMETERS_MISSING));
    }
    if (!emailvalidator.validate(request.body.email)) {
      return response
        .status(HTTP_STATUS_CODE.BAD_REQUEST)
        .json(errorResponse(ERROR_MESSAGE.INVALID_INPUT));
    }
    // Check admin does exist or not inside DB
    const userId = request.body.userId;
    const checkAdminResponse = await checkAdminRecord({ userId: userId });
    if (!checkAdminResponse.isSuccess) {
      return response
        .status(HTTP_STATUS_CODE.INTERNAL_SERVER)
        .json(errorResponse(ERROR_MESSAGE.INTERNAL_SERVER_ERROR));
    }
    if (checkAdminResponse.data) {
      return response
        .status(HTTP_STATUS_CODE.INTERNAL_SERVER)
        .json(errorResponse(ERROR_MESSAGE.ALREADY_EXIST));
    }
    const data = {
      userId: request.body.userId,
      phoneNumber: request.body.phoneNumber,
      name: request.body.name,
      email: request.body.email,
      password: request.body.password,
      menuId: request.body.menuId,
      accountStatus: request.body.accountStatus,
      role: request.body.role,
      company: request.body.company,
      supplierId: request.body.supplierId,
      deleteStatus: false,
    };
    const result = await registerAdmin(data);
    if (!result.success) {
      return response
        .status(HTTP_STATUS_CODE.INTERNAL_SERVER)
        .json(errorResponse(result.data.message));
    } else {
      return res.status(HTTP_STATUS_CODE.OK).json(successResponse(result.data));
    }
  } catch (err) {
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
        .json(errorResponse(ERROR_MESSAGE.REQUIRED_PARAMETERS_MISSING));
    }
    const userId = request.body.userId;
    const password = request.body.password;
    // Hash password
    const hashedPassword = crypto.createHash(password);
    // Fetch admin record
    const data = { userId: userId, password: hashedPassword };
    const fetchAdminResponse = await fetchAdminLoginRecord(data);
    if (!fetchAdminResponse.isSuccess) {
      return response
        .status(HTTP_STATUS_CODE.UNAUTHORIZED)
        .json(errorResponse(ERROR_MESSAGE.ADMIN_NOT_EXISTS));
    } else if (fetchAdminResponse.data === null) {
      return response
        .status(HTTP_STATUS_CODE.BAD_REQUEST)
        .json(errorResponse(ERROR_MESSAGE.USERNAME_PASSWORD_INCORRECT));
    }

    // deleted admin return
    if (fetchAdminResponse.data.deleteStatus == true) {
      return response
        .status(HTTP_STATUS_CODE.FORBIDDEN)
        .json(errorResponse("DELETED ADMIN"));
    }

    // 1. Creating JWE
    const jweResponse = await createJwe({
      userId: userId,
      phoneNumber: fetchAdminResponse.data.phoneNumber,
      role: fetchAdminResponse.data.role,
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
      accessType: "adminLogin",
      userId: userId,
      userIP: parseIp(request),
    };
    const accessLog = await registerAccessLog(accessLogData);
    if (!accessLog.isSuccess) {
      logger.error(accessLog.data.message);
    }

    const updateLastConnection = await updateAdminRecord({
      userId: userId,
      lastConnection: new Date(),
    });
    if (!updateLastConnection.isSuccess) {
      logger.error(updateLastConnection.data.message);
    }

    return response
      .status(HTTP_STATUS_CODE.OK)
      .json(successResponse(SUCCESS_MESSAGE.ADMIN, { token: token }));
  } catch (err) {
    errorHandler(err, response);
  }
};
