/* eslint-disable no-bitwise */
import { postData } from "./postData";
import type { Limits } from "../store/evseConfig/data";
import { SecurityCtrl } from "../store/evseConfig/data";

// Get Bit
function getBit(number: number, bitPosition: number) {
  return (number & (1 << bitPosition)) === 0 ? 0 : 1;
}

// Set Bit
function setBit(number: number, bitPosition: number) {
  return number | (1 << bitPosition);
}

// Clear Bit
function clearBit(number: number, bitPosition: number) {
  const mask = ~(1 << bitPosition);
  return number & mask;
}

export const getLimitStatus = (limits: number, limitName: Limits) => !!getBit(limits, limitName);

export const addApiLimit = (limitData: number, limitName: Limits) => {
  postData(["limitsStatus", setBit(limitData, limitName)]);
  return setBit(limitData, limitName);
};

export const removeApiLimit = (limitData: number, limitName: Limits) => {
  postData(["limitsStatus", clearBit(limitData, limitName)]);
  return clearBit(limitData, limitName);
};

export const getSecurityStatus = (security: number, securityName: SecurityCtrl) => !!getBit(security, securityName);

export const addApiSecurity = (securityData: number, securityName: SecurityCtrl) => {
  postData(["security_ctrl", setBit(securityData, securityName)]);
  return setBit(securityData, securityName);
};

export const removeApiSecurity = (securityData: number, securityName: SecurityCtrl) => {
  postData(["security_ctrl", clearBit(securityData, securityName)]);
  return clearBit(securityData, securityName);
};
