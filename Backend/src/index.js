const servidor = require('../config/server')
const express = require('express');
const morgan = require('morgan');
const rutas = require('../router/network');
const cors = require('cors');
const app = express();
var db = require('../utils/connection');
var mongo = require('../utils/database').database;
var color = require('../utils/color').colors;

db(mongo.url, mongo.options)
    .then((data) => {
        console.log(color.sky_blue, `[DATABASE]=${data}`);
    }).catch((reason) => {
        console.log(color.red, `[ERRO-DATABASE]=${reason}`);
    });
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, DELETE, PUT, OPTIONS");
    next();
});

servidor(app);

rutas(app);