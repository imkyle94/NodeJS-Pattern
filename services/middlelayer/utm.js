import axios from "axios";
import https from "https";
import qs from "qs";
import { logger } from "../../utils/logger.js";
import { ERROR_MESSAGE } from "../../utils/constants.js";
import { URLCONFIG } from "../../config/url.js";

const createUserUTM = async (token, data) => {
  try {
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

    var url = URLCONFIG.MIDDLELAYER_URL + URLCONFIG.UTM_ACCOUNT_CREATE;
    const response = await axios.post(url, data, options);

    return response.data;
  } catch (error) {
    //logger.error(error.toString());
    logger.error(error.stack);
    throw new Error(ERROR_MESSAGE.FAILED_USER_DID_CREATION);
  }
};

const verifyCardService = async (token, data) => {
  try {
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

    var url = URLCONFIG.MIDDLELAYER_URL + URLCONFIG.UTM_TOKEN_VERIFYCARD;

    logger.info("verifyCardService token : " + token);
    logger.info("verifyCardService data : " + JSON.stringify(data));
    logger.info("verifyCardService url : " + url);

    const response = await axios.post(url, data, options);

    return response.data;
  } catch (error) {
    //logger.error("error Message : " + error.toString());
    logger.error(error.stack);
    throw new Error(ERROR_MESSAGE.FAILED_CARD_VERIFICATION);
  }
};

const makePaymentServiceByNicePayDirect = async (data) => {
  try {
    /*
		const agent = new https.Agent({
			rejectUnauthorized: false,
		});
		*/

    const options = {
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      //httpsAgent: agent,
    };

    var url = URLCONFIG.NICE_PAY_SERVER_URL + URLCONFIG.NICE_PAY_MAKEPAYMENT;
    // console.log("url",url)
    logger.info("makePaymentServiceByDirect url : " + url);
    const response = await axios.post(url, qs.stringify(data), options);
    // console.log("response",response)
    //logger.info("/payment/makePayment response", response);
    return response.data;
  } catch (error) {
    //logger.error("exception Message : " + error.toString());
    logger.error(error.stack);
    throw new Error(ERROR_MESSAGE.FAILED_CARD_VERIFICATION);
  }
};

const makePaymentService = async (token, data) => {
  try {
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

    var url =
      URLCONFIG.MIDDLELAYER_URL + URLCONFIG.UTM_TOKEN_PAYMENTFORTOKENNOUI;
    // console.log("url",url)
    logger.info("makePaymentService url : " + url);
    const response = await axios.post(url, data, options);
    // console.log("response",response)
    //logger.info("/payment/makePayment response", response);
    return response.data;
  } catch (error) {
    //logger.error("exception Message : " + error.toString());
    logger.error(error.stack);
    throw new Error(ERROR_MESSAGE.FAILED_CARD_VERIFICATION);
  }
};

const nicePayPaymentService = async (token, data) => {
  try {
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

    var url = URLCONFIG.MIDDLELAYER_URL + URLCONFIG.UTM_TOKEN_NICEPAY;
    const response = await axios.post(url, data, options);

    return response.data;
  } catch (error) {
    //logger.error(error.toString());
    logger.error(error.stack);
    throw new Error(ERROR_MESSAGE.FAILED_CARD_VERIFICATION);
  }
};

const cancelPaymentServiceByNicePayDirect = async (data) => {
  try {
    /*
		const agent = new https.Agent({
			rejectUnauthorized: false,
		});
		*/

    const options = {
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        // 'x-auth-token': token,
      },
      //httpsAgent: agent,
    };

    var url = URLCONFIG.NICE_PAY_SERVER_URL + URLCONFIG.NICE_PAY_CANCELPAYMENT;

    //logger.info("cancelPaymentServiceByNicePayDirect url : " + url);
    //logger.info("cancelPaymentServiceByNicePayDirect data : " + JSON.stringify(data));

    const response = await axios.post(url, qs.stringify(data), options);

    //logger.info("cancelPaymentServiceByNicePayDirect data : " + JSON.stringify(data));
    //logger.info("cancelPaymentServiceByNicePayDirect response : " + JSON.stringify(response));

    return response.data;
  } catch (error) {
    //logger.error(error.toString());
    logger.error(error.stack);
    throw new Error(ERROR_MESSAGE.FAILED_CARD_VERIFICATION);
  }
};

const cancelPaymentService = async (token, data) => {
  try {
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

    var url = URLCONFIG.MIDDLELAYER_URL + URLCONFIG.UTM_TOKEN_CANCELPAYMENT;
    const response = await axios.post(url, data, options);

    return response.data;
  } catch (error) {
    //logger.error(error.toString());
    logger.error(error.stack);
    throw new Error(ERROR_MESSAGE.FAILED_CARD_VERIFICATION);
  }
};

const fetchPaymentHistoryService = async (token) => {
  try {
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

    var url = URLCONFIG.MIDDLELAYER_URL + URLCONFIG.UTM_ACCOUNT_PAYMENTHISTORY;
    const response = await axios.get(url, options);

    return response.data;
  } catch (error) {
    //logger.error(error.toString());
    logger.error(error.stack);
    throw new Error(ERROR_MESSAGE.FAILED_FETCHING_PAYMENT_HISTORY);
  }
};

const fetchBalanceService = async (token) => {
  try {
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

    var url = URLCONFIG.MIDDLELAYER_URL + URLCONFIG.UTM_ACCOUNT_FETCHBALANCE;
    const response = await axios.get(url, options);

    return response.data;
  } catch (error) {
    //logger.error(error.toString());
    logger.error(error.stack);
    throw new Error(ERROR_MESSAGE.FAILED_FETCH_BALANCE);
  }
};

const transferTokenService = async (token, data) => {
  try {
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

    var url = URLCONFIG.MIDDLELAYER_URL + URLCONFIG.UTM_TOKEN_TRANSFER;
    const response = await axios.post(url, data, options);

    return response.data;
  } catch (error) {
    //logger.error(error.toString());
    logger.error(error.stack);
    throw new Error(ERROR_MESSAGE.TRANSFER_TOKEN_FAILED);
  }
};

export {
  createUserUTM,
  verifyCardService,
  makePaymentService,
  makePaymentServiceByNicePayDirect,
  cancelPaymentService,
  cancelPaymentServiceByNicePayDirect,
  fetchPaymentHistoryService,
  fetchBalanceService,
  transferTokenService,
  nicePayPaymentService,
};
