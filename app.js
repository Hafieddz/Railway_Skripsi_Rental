require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { json } = require("sequelize");
const router = require("./routes/index");

const app = express();
const PORT = process.env.PORT || 8001;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
// app.use(
//   session({ secret: "kelompok3", saveUninitialized: true, resave: true })
// );
app.use(router);

app.listen(PORT, () => {
  console.log(`Server running on PORT : ${PORT}`);
});
