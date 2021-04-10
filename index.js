//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const basicAuth = require('express-basic-auth');
const cors = require('cors');
const morgan = require("morgan");
const products = require('./routes/products');
const messages = require('./routes/messages');

const app = express();
app.set('view engine', 'ejs');

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
// app.use('/uploads', express.static('./uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(basicAuth({ users: { 'admin': 'admin@2021' } }));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.header("Access-Control-Allow-Methods", "PUT, POST, GET, OPTIONS, DELETE");
    next();
});

//////////////////////////ROUTES\\\\\\\\\\\\\\\\\\\\\\\\\\\\

app.use('/products', products);
app.use('/messages', basicAuth({ users: { 'admin': 'admin@2021' } }), messages);



let port = process.env.PORT;
let DB = 'mongodb+srv://admin-ABOU:ABOU@2021@abou-db.cz1ev.mongodb.net/abou-db'
if (port == null || port == "") {
    port = 3000;
    DB = 'mongodb://localhost:27017/ABOU'
}
app.listen(port, function () {
    console.log(`Server started on port ${port}`);
});

// Connect MongoDB using mongoose

mongoose.connect(DB, {
    useNewUrlParser: true, useUnifiedTopology: true
});
