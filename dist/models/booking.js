"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _pg = require("pg");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var pool = new _pg.Pool();
var table = 'bookings';
var table1 = 'trips';
var table2 = 'users';

var Bookings =
/*#__PURE__*/
function () {
  function Bookings() {
    _classCallCheck(this, Bookings);
  }

  _createClass(Bookings, null, [{
    key: "find",
    value: function find(userId) {
      var sql = "SELECT ".concat(table, ".booking_id, ").concat(table, ".seat_number, ").concat(table, ".user_id, ").concat(table, ".trip_id, ").concat(table2, ".first_name, ").concat(table2, ".last_name, ").concat(table2, ".email FROM ").concat(table2, " JOIN ").concat(table, " ON ").concat(table2, ".id = ").concat(table, ".user_id WHERE user_id=").concat(userId);
      return pool.query(sql);
    } // SELECT * FROM bookings Inner JOIN trips ON bookings.trip_id = trips.id WHERE trip_id = $1

  }, {
    key: "findAll",
    value: function findAll(req, res) {
      // let sql = `SELECT ${table}.booking_id, ${table}.seat_number, ${table}.user_id, ${table}.trip_id, ${table2}.first_name, ${table2}.last_name, ${table2}.email FROM ${table2} JOIN ${table} ON ${table2}.id = ${table}.user_id`;
      // return pool.query(sql);
      var sql = "SELECT bookings.booking_id, bookings.seat_number, bookings.user_id, bookings.trip_id, users.first_name, users.last_name, users.email FROM users JOIN bookings ON users.id = bookings.user_id";
      return pool.query(sql);
    }
  }, {
    key: "create",
    value: function create(req, res) {
      var sql = "INSERT INTO ".concat(table, " (user_id, trip_id, seat_number, created_on) VALUES ($1, $2, $3, $4) RETURNING *");

      var decoded = _jsonwebtoken["default"].verify(req.token, process.env.SECRET_KEY);

      var values = [decoded.user.id, req.body.trip_id, req.body.seat_number, new Date()];
      return pool.query(sql, values);
    }
  }, {
    key: "delete",
    value: function _delete(req, res) {
      var bookingId = req.params.id;

      var _jwt$verify = _jsonwebtoken["default"].verify(req.token, process.env.SECRET_KEY),
          user = _jwt$verify.user;

      var sql = "DELETE FROM ".concat(table, " WHERE booking_id='").concat(bookingId, "' AND user_id='").concat(user.id, "'");
      return pool.query(sql);
    }
  }, {
    key: "select",
    value: function select(bookingId) {
      var sql = "SELECT * FROM ".concat(table, " WHERE booking_id='").concat(bookingId, "'");
      return pool.query(sql);
    }
  }]);

  return Bookings;
}();

exports["default"] = Bookings;