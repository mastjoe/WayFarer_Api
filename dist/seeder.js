"use strict";

var _pg = require("pg");

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var pool = new _pg.Pool();

_dotenv["default"].config();

var user = {
  first_name: 'admin',
  last_name: 'admin',
  email: 'admin@email.com',
  is_admin: true,
  password: 'password'
};
var token = jwt.sign({
  user: user
}, process.env.SECRET_KEY, {
  expiresIn: '2h'
});
var userSql = "INSERT INTO users\n (first_name, last_name, email, is_admin, password,token created_at) \n VALUES ('admin', 'admin', 'admin@email.com', 'true','password','".concat(token, "', NOW())");
pool.query(userSql).then(function (r) {
  console.log('admin seeded');
  pool.end();
})["catch"](function (e) {
  console.log('admin not seeded' + e);
  pool.end();
});