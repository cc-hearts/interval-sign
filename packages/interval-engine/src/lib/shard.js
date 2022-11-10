import Logger from "./log.js";

const noop = () => {};
function getHoursAndMinutes(date) {
  if (date instanceof Date) {
    return `${String(date.getHours()).padStart(2, 0)}-${date.getMinutes()}`;
  }
  return null;
}

function getCurrentDate() {
  const date = new Date();
  return `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

function compareHourAndMinutes(originDate) {
  if (!originDate) {
    return;
  }
  const currentDate = getHoursAndMinutes(new Date());
  // Logger.log("currentDate :", currentDate);
  // Logger.log("originDate :", originDate);
  originDate = formatHoursAndMinutes(originDate);
  return currentDate === originDate;
}

function splitISOString(date) {
  return date.split("T")[0];
}
function compareISODate(originDate) {
  if (!originDate) {
    return;
  }
  let currentDate = new Date().toISOString();
  currentDate = splitISOString(String(currentDate));
  originDate = splitISOString(originDate.toISOString());
  // Logger.log("currentDate :", currentDate);
  // Logger.log("originDate :", originDate);
  return currentDate === originDate;
}

function formatHoursAndMinutes(date) {
  const [hour, minute] = date.split(":");
  return `${String(hour).padStart(2, 0)}-${minute}`;
}

function getCurrentDateFormat() {
  const date = new Date();
  return `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

export {
  getHoursAndMinutes,
  getCurrentDate,
  formatHoursAndMinutes,
  compareHourAndMinutes,
  noop,
  compareISODate,
  getCurrentDateFormat
};
