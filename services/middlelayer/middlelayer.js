import axios from "axios";
import https from "https";
import { logger } from "../../utils/logger.js";
import { ERROR_MESSAGE } from "../../utils/constants.js";
import { URLCONFIG } from "../../config/url.js";

/**
 * Login via middlelayer
 *
 * @param {object} request The request object
 * @param {object} response The response object
 **/
const loginMiddlelayer = async (data) => {
  try {
    const agent = new https.Agent({
      rejectUnauthorized: false,
    });
    const options = {
      headers: {
        "content-type": "application/json",
      },
      httpsAgent: agent,
    };
    var url = URLCONFIG.MIDDLELAYER_URL + URLCONFIG.MIDDLELAYER_LOGIN;
    const response = await axios.post(url, data, options);

    return response.data;
  } catch (error) {
    logger.error(error.stack);
    logger.error("loginMiddlelayer Error : ", error.toString());
    throw new Error(ERROR_MESSAGE.LOGIN_MIDDLELAYER_FAILED);
  }
};

const updateMiddleLayerPassword = async (data) => {
  try {
    const token = data.token;
    const prePassword = data.prePassword;
    const newPassword = data.newPassword;

    const agent = new https.Agent({
      rejectUnauthorized: false,
    });
    const options = {
      headers: {
        "content-type": "application/json",
        "x-auth-token": token,
      },
      httpsAgent: agent,
    };

    var url = `${URLCONFIG.MIDDLELAYER_URL}/user/changepassword`;
    const updateRes = await axios.post(
      url,
      { password: prePassword, newPassword: newPassword },
      options
    );

    return updateRes.data;
  } catch (error) {
    logger.error(error.toString());
    throw new Error("Error : Update MiddleLayer Password Failure");
  }
};

export { loginMiddlelayer, updateMiddleLayerPassword };
