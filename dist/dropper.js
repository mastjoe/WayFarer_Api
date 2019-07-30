"use strict";

var _pg = require("pg");

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var pool = new _pg.Pool();

_dotenv["default"].config();

var dropSql = "DROP TABLE IF EXISTS users, trips, bookings, buses";
pool.query(dropSql).then(function (r) {
  console.log('tables dropped');
  pool.end();
})["catch"](function (e) {
  console.log('tables not dropped');
  pool.end();
});
var typeSql = "DROP TYPE s_type";
pool.query(typeSql).then(function (r) {
  console.log('status type dropped');
})["catch"](function (e) {
  console.log('status type not dropped', e);
});
pool.end();