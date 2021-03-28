const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const cookieParser = require("cookie-parser")

const server = express()
server.use(express.json())
server.use(helmet())
server.use(cors())
server.use(cookieParser())

server.use((err, req, res, next) => { // eslint-disable-line
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server
