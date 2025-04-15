require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { json } = require("sequelize");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(
  session({ secret: "kelompok3", saveUninitialized: true, resave: true })
);
