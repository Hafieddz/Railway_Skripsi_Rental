const scheduleExpiredCheck = require("./checkExpiredBooking");

const initializeCronJobs = () => {
  scheduleExpiredCheck();
  ("Semua cron job dijalankan");
};

module.exports = initializeCronJobs;
