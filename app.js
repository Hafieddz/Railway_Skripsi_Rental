require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const router = require("./routes/index");
const handleError = require("./middlwares/handleError");
const initializeCronJobs = require("./cron-jobs");

const app = express();
const PORT = process.env.PORT || 8001;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.use((req, res, next) => {
  res.status(404).json({ message: "Rute Tidak Ditemukan" });
});

app.use(handleError);

app.listen(PORT, () => {
  (`Server running on PORT : ${PORT}`);
  // initializeCronJobs();
});
