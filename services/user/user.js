import { OTHERCONFIG } from "../../config/other.js";
const SECRET_KEY = OTHERCONFIG.SECRET;

import * as crypto from "../../utils/crypto.js";

import { userModel } from "../../models/userModel/userSchema.js";
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
 * Register User
 * @param {object} - Users Data
 * @returns {object}
 **/
export const registerUser = async (data) => {
  // Hash password
  // const hashedPassword = crypto.createHash(data.password);
  // const hashedPassword = await crypto.createHash(data.password, SECRET_KEY);

  // password 객체저장을 아직 고민 중이라 주석 처리
  // const hashedPassword = await crypto.encrypt(data.password, SECRET_KEY);
  // data.password = hashedPassword;

  let result;

  // Save user in the database
  try {
    result = await models.user.create(data);
  } catch (err) {
    logger.error(
      "registerUser Error : " + ERROR_MESSAGE.FETCHING_USER_ERROR + err
    );
    return { isSuccess: false, data: err };
  }

  return result;
};

/**
 * Fetch user login record
 * @param {object} data - "Fetch user record using phoneNumber"
 * @returns {object}
 **/
export const fetchUserLoginRecord = async (data) => {
  // let cond = { userId: data.userId, password: data.password };

  let cond = { userId: data.userId, password: "11" };
  logger.info("fetchUserLoginRecord data : " + JSON.stringify(data));

  try {
    const userRecord = await models.user.findOne({
      where: cond,
    });

    if (!userRecord) {
      return { isSuccess: false, data: ERROR_MESSAGE.USER_NOT_EXISTS };
    } else {
      return { isSuccess: true, data: userRecord };
    }
  } catch (err) {
    logger.error(ERROR_MESSAGE.FETCHING_USER_ERROR + err);
    return { isSuccess: false, data: err };
  }
};

/**
 * Fetch user record
 * @param {object} data - "Fetch user record using phoneNumber"
 * @returns {object}
 **/
export const fetchUserRecord = async (data) => {
  let cond = { userId: data.userId };

  logger.info("fetchUserRecord data : " + JSON.stringify(data));

  try {
    const userRecord = await models.user.findOne({
      where: cond,
    });

    if (!userRecord) {
      return { isSuccess: false, data: ERROR_MESSAGE.PHONE_NUMBER_NOT_EXIST };
    } else {
      const userData = {
        phoneNumber: userRecord.phoneNumber,
        name: userRecord.name,
        email: userRecord.email,
        dob: userRecord.dob,
        password: userRecord.password,
        drivingLicense: userRecord.drivingLicense,
        registration: userRecord.registration,
        did: userRecord.did,
        lastConnection: userRecord.lastConnection,
        counter: userRecord.counter,
        delDate: userRecord.delDate,
        delStatus: userRecord.delStatus,
        age: userRecord.age,
        gender: userRecord.gender,
        address: userRecord.address,
        importedService: userRecord.importedService,
        servicePlatform: userRecord.servicePlatform,
        userId: userRecord.userId,
        _id: userRecord._id,
      };
      return { isSuccess: true, data: userData };
    }
  } catch (err) {
    logger.error(ERROR_MESSAGE.FETCHING_USER_ERROR + err);
    return { isSuccess: false, data: err };
  }
};

export const fetchPasswordRecord = async (data1) => {
  try {
    const userRecord = await models.user.findAndCountAll({
      where: { phoneNumber: data1.phoneNumber },
    });

    if (userRecord.count == 0) {
      return { isSuccess: false, data: ERROR_MESSAGE.USER_NOT_EXISTS };
    } else {
      return { isSuccess: true, data: userRecord };
    }
  } catch (err) {
    logger.error(ERROR_MESSAGE.FETCHING_ADMIN_ERROR + err);
    return { isSuccess: false, data: ERROR_MESSAGE.FETCHING_ADMIN_ERROR };
  }
};

/**
 * Updates the user record
 * @param {Object} data - 'Update user record using Phone Number'
 * @returns {object}
 **/
export const updateUserRecord = async (data) => {
  let cond = { phoneNumber: data.phoneNumber };

  /*
	 2022/07/22 핸드폰 번호가 PK 로 확정
	 주석 처리 및 원복
	if(data.email != null && data.email.length > 0)
	{
		cond = {email: data.email};
	}
	*/

  logger.info("updateUserRecord : " + data.phoneNumber + "," + data.email);
  logger.info("updateUserRecord data : " + JSON.stringify(data));

  try {
    const userUpdateRecord = await models.user.update(data, { where: cond });

    return { isSuccess: true, data: userUpdateRecord };

    // nModified : mongoose 기능 업데이트 성공 유무 확인
    // if (userUpdateRecord.nModified == 0) {
    //   return { isSuccess: false };
    // } else {
    //  }
  } catch (err) {
    logger.error(ERROR_MESSAGE.ERROR_UPDATE_USERINFO + err);
    return { isSuccess: false, data: err };
  }
};

export const checkUserByPhoneMail = async (data) => {
  let cond = { phoneNumber: data.phoneNumber };

  /*
	 2022/07/22 핸드폰 번호가 PK 로 확정
	 주석 처리 및 원복
	if(data.email != null && data.email.length > 0)
	{
		cond = {email: data.email};
	}
	*/

  try {
    // const userRecord = await userModel.find(cond).count();
    const userRecord = await models.user.findAndCountAll({
      where: cond,
    });

    logger.info(SUCCESS_MESSAGE.RECORD_CHECKED);
    return { isSuccess: true, data: userRecord.count > 0 ? true : false };
  } catch (err) {
    logger.error("Error In Check User");
    return { isSuccess: false, data: err };
  }
};
