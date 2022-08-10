import jwt from "jsonwebtoken";
import jose from "node-jose";

import { logger } from "../utils/logger.js";

import { JWKCONFIG } from "../config/jwk.js";

/**
 * Create JWE token
 * @param {object} data - Raw data that needs to be encrypted
 * @returns {object}
 */
const createJwe = async (data) => {
  try {
    // Import JWK
    const key = await jose.JWK.asKey(JWKCONFIG.exportedJwk);
    // Create JWE
    const jwe = await jose.JWE.createEncrypt(key)
      .update(JSON.stringify(data))
      .final();
    return { isSuccess: true, data: jwe };
  } catch (err) {
    return { isSuccess: false, data: err };
  }
};

/**
 * Create JSE token
 * @param {object} data - Data needs to be signed
 * @returns {string}
 */
const createJws = (data) => {
  return jwt.sign(data, JWKCONFIG.Secret_Key, { expiresIn: "7h" });
};

/**
 * Verify JSE token
 * @param {string} token - Token needs to be verified
 * @returns {string}
 */
const verifyJws = (token) => {
  try {
    return { isSuccess: true, data: jwt.verify(token, JWKCONFIG.Secret_Key) };
  } catch (err) {
    return { isSuccess: false, data: err };
  }
};

/**
 * Decrypt JWE token
 * @param {object} token - token that needs to be dencrypted
 * @returns {object}
 */
const decryptJwe = async (token) => {
  try {
    // Import JWK
    const key = await jose.JWK.asKey(JWKCONFIG.exportedJwk);

    // Decrypt JWE
    const decryptedJwe = await jose.JWE.createDecrypt(key).decrypt(token);
    const data = decryptedJwe.payload.toString("utf-8");
    return { isSuccess: true, data: JSON.parse(data) };
  } catch (err) {
    return { isSuccess: false, data: err };
  }
};

/**
 * Decrypt Jose token
 * @param {string} token - JOSE token
 * @returns {object}
 */
const decryptJose = async (token) => {
  try {
    // Validate token and extract jwe from it
    const jweToken = verifyJws(token);
    if (!jweToken.isSuccess) {
      throw jweToken.data;
    }

    // Decrypt jwe
    const data = await decryptJwe(jweToken.data);
    if (!data.isSuccess) {
      throw data.data;
    }
    return { isSuccess: true, data: data.data };
  } catch (err) {
    return { isSuccess: false, data: err };
  }
};

export { createJwe, createJws, verifyJws, decryptJwe, decryptJose };
