const numberReg = /^\d+$/;
const decimalReg = /^(?!0\d)\d*(\.\d+)?$/; // 整数超过两位就不能以0开头
const postcodeReg = /^\d{6}$/;
const mobileReg = /^(1[3-9])\d{9}$/;
const telephoneReg = /^(\+\d{2}-)?0\d{2,3}-\d{7,8}$/;
const emailReg = /^[0-9A-Za-z_]+([-+.][0-9A-Za-z_]+)*@[0-9A-Za-z_]+([-.][0-9A-Za-z_]+)*\.[0-9A-Za-z_]+([-.][0-9A-Za-z_]+)*$/;

const zhCN = /^[\u4e00-\u9fa5]+$/;

// 城市en
const cityEn = /^[a-zA-Z'\\s]+$/;

// 小阔里的内容
const parentheses = /\((.+?)\)/;
// const parentheses = /(?<=\()(.+?)(?=\))/;

export {
  numberReg,
  decimalReg,
  postcodeReg,
  mobileReg,
  telephoneReg,
  emailReg,
  zhCN,
  cityEn,
  parentheses,
}