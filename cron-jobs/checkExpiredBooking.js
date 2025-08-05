const cron = require("node-cron");
const {
  updateExpiredBookings,
  notifyUserBeforeExpired,
} = require("../services/bookingExpiredService");

const scheduleExpiredCheck = () => {
  cron.schedule(
    "* * * * * ",
    async () => {
      ("\x1b[44m\x1b[37mSchedule Expired Check Running...\x1b[0m");

      try {
        const updatedCount = await updateExpiredBookings();
        const userNotified = await notifyUserBeforeExpired();

        ("\x1b[44m\x1b[37mSchedule Expired Check Finish.\x1b[0m");
        (`\x1b[44m\x1b[37mExpired Books : ${updatedCount}.\x1b[0m`);
        (`\x1b[44m\x1b[37mUser Notified : ${userNotified}.\x1b[0m`);
      } catch (error) {
        (`Error terjadi : ${error}`);
      }
    },
    {
      timezone: "Asia/Makassar",
    }
  );
};

module.exports = scheduleExpiredCheck;
