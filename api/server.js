const express = require('express');
const morgan = require('morgan');
const server = express();

server.use(express.json());
server.use(morgan('dev'));
server.use(logger);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
