// Main starting point of the application
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const productsRouter = require('./productsRouter');
const mongoose = require("mongoose");
const cors = require('cors');

// DB Setup
mongoose.connect('mongodb://localhost/zaatoot');
 
// App setup
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }))
// Routes
router(app)
//Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listing on:', port);