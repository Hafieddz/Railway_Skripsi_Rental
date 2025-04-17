require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { json } = require("sequelize");
const router = require("./routes/index");
const handleError = require("./middlwares/handleError");

const app = express();
const PORT = process.env.PORT || 8001;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(router);
app.use(handleError);

app.listen(PORT, () => {
  console.log(`Server running on PORT : ${PORT}`);
});
