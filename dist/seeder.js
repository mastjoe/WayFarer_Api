"use strict";

var _pg = require("pg");

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var pool = new _pg.Pool();

_dotenv["default"].config();

var userSql = "INSERT INTO users\n (first_name, last_name, email, is_admin, password, created_at) \n VALUES ('admin', 'admin', 'admin@email.com', 'true','password', NOW())";
pool.query(userSql).then(function (r) {
  console.log('admin seeded');
  pool.end();
})["catch"](function (e) {
  console.log('admin not seeded' + e);
  pool.end();
});