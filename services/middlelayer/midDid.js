import axios from "axios";
import https from "https";
import { logger } from "../../utils/logger.js";
import { URLCONFIG } from "../../config/url.js";

//const { getDid } = require('../../services/middlelayer/wallet.js');
import {
  ERROR_MESSAGE,
  REQ_HEADER,
  SUCCESS_MESSAGE,
  HTTP_STATUS_CODE,
  // HEADER_KEY_TOKEN,
  MESSAGES,
} from "../../utils/constants.js";

const createUserDID = async (data) => {
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
    console.log("options in midDID.js", options);

    var url = URLCONFIG.MIDDLELAYER_URL + URLCONFIG.DID_AGENT_CREATE;
    console.log("url", url);
    console.log("data_line47", data);

    const response = await axios.post(url, data, options);

    console.log("response_line48", response);

    return response.data;

    // response.data
    // data: {
    //   status: 'success',
    //   message: 'Agent creation is in progress, please try other services after some time',
    //   token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm90ZWN0ZWQiOiJleUpsYm1NaU9pSkJNalUyUjBOTklpd2lZV3huSWpvaVpHbHlJaXdpYTJsa0lqb2lObUpFVWxaZlNrZE5jVVpJZFhwUVZrWTVUM1p2YjNKWlRVcG9kMEZIVG5Oa1kwbzBNRzVPVEZwaWR5SjkiLCJpdiI6IkJ5MWxUeUdEeDNiVVpNa3oiLCJjaXBoZXJ0ZXh0IjoidmI5ZjRRTi1DYW5wRWdqeVNQZVBLN2hocmo4SnBHODZ6enptQlcxeWFONTlGaVVYcENxZlBBOFAyZTBaUktkNnZpMVFfclhaa3NuX2Y4TFNNRnlPVUViNDZnIiwidGFnIjoibWF6TVRCbFBXclhNWmV1Zjl3dGd3QSIsImlhdCI6MTY2MDI2NDk3NH0.A2ZQ91BBicuSEWvEGsH5A9bOJvjMF-0_oiH-LTzlFHw'
    // }
  } catch (error) {
    //logger.error(error.toString());
    logger.error(error.stack);
    throw new Error(ERROR_MESSAGE.FAILED_USER_DID_CREATION);
  }
};

/**
 * Fetch DID from wallet
 *
 * @param {object} request The request object
 * @param {object} response The response object
 **/
const getDid = async (token) => {
  try {
    const agent = new https.Agent({
      rejectUnauthorized: false,
    });
    const options = {
      headers: {
        "content-type": "application/json",
        "X-Auth-Token": token,
      },
      httpsAgent: agent,
    };
    var url = URLCONFIG.MIDDLELAYER_URL + URLCONFIG.FETCH_DID;
    const response = await axios.get(url, options);
    return response.data;
  } catch (error) {
    //logger.error(error.toString());
    logger.error(error.stack);
    throw new Error(ERROR_MESSAGE.FAILED_USER_DID_CREATION);
  }
};

export { createUserDID, getDid };
