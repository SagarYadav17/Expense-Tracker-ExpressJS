function isValidDateTimeString(datetimeString) {
  const regex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
  return regex.test(datetimeString);
}

module.exports = isValidDateTimeString;
