"use strict";

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _auth = _interopRequireDefault(require("./middlewares/auth"));

var _user = _interopRequireDefault(require("./middlewares/user"));

var _user2 = _interopRequireDefault(require("./routes/user"));

var _signup = _interopRequireDefault(require("./routes/signup"));

var _signin = _interopRequireDefault(require("./routes/signin"));

var _trips = _interopRequireDefault(require("./routes/trips"));

var _bus = _interopRequireDefault(require("./routes/bus"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();

var result = _dotenv["default"].config();

app.use((0, _morgan["default"])('dev'));
app.use(_bodyParser["default"].urlencoded({
  extended: false
}));
app.use(_bodyParser["default"].json());

var router = _express["default"].Router(); // route group here...
// sign up...


app.use('/api/v1/auth/signup', _signup["default"]);
app.use('/api/v1/auth/signin', _signin["default"]);
app.use('/api/v1/trips', _auth["default"].verifyToken, _trips["default"]);
app.use('/api/v1/bus', _auth["default"].verifyToken, _user["default"].adminCheck, _bus["default"]);
app.use('/api/v1/users', _user2["default"]); // catch 404 and forward to error handler

app.use(function (req, res, next) {
  var error = new Error('Not found');
  error.status = 404;
  next(error);
});
app.use(function (error, req, res, next) {
  res.status(error.status || 500);
  res.json({
    status: 'error',
    error: error.message
  });
});
module.exports = app;