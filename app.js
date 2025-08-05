require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const router = require("./routes/index");
const handleError = require("./middlwares/handleError");
const initializeCronJobs = require("./cron-jobs");

const app = express();
const PORT = process.env.PORT || 8001;

const allowedOrigins = [
  "http://localhost:5173",
  "https://frontend-c3-rental-dydft47ar-hafieddzs-projects.vercel.app",
  "https://frontend-c3-rental.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
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
  `Server running on PORT : ${PORT}`;
  // initializeCronJobs();
});
