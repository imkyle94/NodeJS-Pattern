import { logger } from "./logger.js";

/** Error Response Function
 *
 * @param message - Error Response Message
 */
const errorResponse = (message) => {
  //   logger.error(message);
  return { status: "error", message: message };
};

/** Success Response Function
 *
 * @param message -   Success Response Message
 * @param data    -   Success Response Data
 */
const successResponse = (message, data) => {
  return { status: "success", message: message, data: data };
};

const errorHandler = (error, response) => {
  logger.error(error.stack);
  response.status(200).json(errorResponse(error.message));

  /*
	  logger.error(JSON.stringify(error));
	  let code = error.toString().match(/\d+/);
	  let errorString;
	  if (code == null) {
		  code = 500;
		  errorString = error.toString();
	  } else {
		  code = code[0];
		  errorString = error.toString().split(":");
		  errorString.splice(0, 1);
		  errorString.splice(1, 1);
		  errorString = errorString.join(":");
	  }
	  code = code.toString();
	  if (code == 0) code = 500;
	  response.status(code).json(errorResponse(errorString));
	  */
};

export { successResponse, errorResponse, errorHandler };
