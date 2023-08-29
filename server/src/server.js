const express = require("express");
const router = require("./routes");
const morgan = require("morgan");
const cors = require("cors");
const {loadDataBase } = require("../src/controllers/loadDataBase");

const server = express();

server.use(morgan("dev"));
server.use(express.json());
server.use(cors());
loadDataBase()

server.use('/', router);

module.exports = server;
