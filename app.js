const express = require("express");
const path = require("path");

const app = express();

const BASE_URL = "https://projecteuler.net/";  // Project Euler base URL

const getProblem = require("./routes/problem");

app.use(express.static("public"));
app.use("/problem", getProblem);

module.exports = app;
