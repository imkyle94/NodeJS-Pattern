import { adminModel } from "../../models/adminSchema.js";

import * as crypto from "../../utils/crypto.js";

export const registerAdmin = async (data) => {
  // Hash password
  try {
    const hashedPassword = crypto.createHash(data.password);
    data.password = hashedPassword;

    // Save admin in the database
    const admin = new adminModel(data);
    const result = await admin.save(admin);

    // db connection 여기서
    let conn;
    conn = await pool.getConnection();
    const rows = await conn.query("SELECT 1 as val");
    console.log(rows); //[ {val: 1}, meta: ... ]
    const res = await conn.query("INSERT INTO myTable value (?, ?)", [
      1,
      "mariadb",
    ]);
    console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }

    return { isSuccess: true, data: result };
  } catch (err) {
    return { isSuccess: false, data: err };
  }
};

/**
 * Checks if a admin record exists
 * @param {object} data Admin data object
 * @returns {object}
 **/
export const checkAdminRecord = async (data) => {
  try {
    const adminRecord = await adminModel.find(data).exec();
    logger.info(SUCCESS_MESSAGE.ADMIN_RECORD_CHECKED);

    return { isSuccess: true, data: adminRecord.length > 0 ? true : false };
  } catch (err) {
    logger.error(ERROR_MESSAGE.CHECKING_ADMIN_ERROR + err);
    return { isSuccess: false, data: ERROR_MESSAGE.CHECKING_ADMIN_ERROR };
  }
};

/**
 * Fetch admin Login record
 * @param {object} userId,Password - "Fetch admin record using userId,Password"
 * @returns {object}
 **/
export const fetchAdminLoginRecord = async (data) => {
  try {
    const adminRecord = await adminModel
      .findOne({ userId: data.userId, password: data.password })
      .exec();
    if (!adminRecord) {
      return { isSuccess: false, data: ERROR_MESSAGE.PHONE_NUMBER_NOT_EXIST };
    } else {
      return { isSuccess: true, data: adminRecord };
    }
  } catch (err) {
    logger.error(ERROR_MESSAGE.FETCHING_ADMIN_ERROR + err);
    return { isSuccess: false, data: ERROR_MESSAGE.FETCHING_ADMIN_ERROR };
  }
};

export const registerAccessLog = async (data) => {
  // Save admin in the database
  try {
    const access = new accessModel(data);
    const result = await access.save(access);
    return { isSuccess: true, data: result };
  } catch (err) {
    return { isSuccess: false, data: err };
  }
};

/**
 * Updates the admin record
 * @param {Object} data - 'Update admin record using Phone Number'
 * @returns {object}
 **/
export const updateAdminRecord = async (data) => {
  try {
    const adminUpdateRecord = await adminModel.updateOne(
      { userId: data.userId },
      { $set: data }
    );
    if (
      adminUpdateRecord.matchedCount == 0 ||
      adminUpdateRecord.modifiedCount == 0
    ) {
      return { isSuccess: false, data: ERROR_MESSAGE.ERROR_UPDATE_ADMININFO };
    } else {
      return { isSuccess: true, data: adminUpdateRecord };
    }
  } catch (err) {
    logger.error(ERROR_MESSAGE.ERROR_UPDATE_ADMININFO + err);
    return { isSuccess: false, data: ERROR_MESSAGE.ERROR_UPDATE_ADMININFO };
  }
};
