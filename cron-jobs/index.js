const scheduleExpiredCheck = require("./checkExpiredBooking");

const initializeCronJobs = () => {
  scheduleExpiredCheck();
  console.log("Semua cron job dijalankan");
};

module.exports = initializeCronJobs;
