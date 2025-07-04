module.exports = (startDate, duration) => {
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + parseInt(duration));
  endDate.setHours(19, 59, 59, 999);
  return endDate;
};
