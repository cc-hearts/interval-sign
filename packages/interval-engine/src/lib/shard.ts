const noop = () => {};
function getHoursAndMinutes(date: Date): string | null {
  if (date instanceof Date) {
    return `${String(date.getHours()).padStart(2, "0")}-${date.getMinutes()}`;
  }
  return null;
}

function getCurrentDate(): string {
  const date = new Date();
  return `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

function compareHourAndMinutes(originDate: string): boolean {
  if (!originDate) {
    return false;
  }
  const currentDate = getHoursAndMinutes(new Date());
  originDate = formatHoursAndMinutes(originDate);
  return currentDate === originDate;
}

function splitISOString(date: string): string {
  return date.split("T")[0];
}
function compareISODate(originDate: Date | string) {
  if (!originDate) {
    return false;
  }
  let currentDate = new Date().toISOString();
  if (originDate instanceof Date) {
    currentDate = splitISOString(String(currentDate));
    originDate = splitISOString(originDate.toISOString());
    return currentDate === originDate;
  }
  return false;
}

function formatHoursAndMinutes(date: string): string {
  const [hour, minute] = date.split(":");
  return `${String(hour).padStart(2, "0")}-${minute}`;
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
  getCurrentDateFormat,
};
