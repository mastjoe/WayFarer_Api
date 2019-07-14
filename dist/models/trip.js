"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _pg = require("pg");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var pool = new _pg.Pool();
var table = 'trips';

var Trip =
/*#__PURE__*/
function () {
  function Trip() {
    _classCallCheck(this, Trip);
  }

  _createClass(Trip, null, [{
    key: "find",
    value: function find(id) {
      var sql = "SELECT * FROM ".concat(table, " WHERE id='").concat(id, "'");
      return pool.query(sql);
    }
  }, {
    key: "findAll",
    value: function findAll(req, res) {
      var sql = "SELECT * FROM ".concat(table);
      return pool.query(sql);
    }
  }, {
    key: "createTrip",
    value: function createTrip(req, res) {
      var sql = "INSERT INTO ".concat(table, " (bus_id, origin, destination, trip_date, fare, created_on) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *");
      var values = [req.body.bus_id, req.body.origin, req.body.destination, req.body.trip_date, req.body.fare, new Date()];
      return pool.query(sql, values);
    }
  }, {
    key: "deleteTrip",
    value: function deleteTrip(id) {
      var sql = "DELETE FROM ".concat(table, " WHERE id='").concat(table, "'");
      return pool.query(sql);
    }
  }]);

  return Trip;
}();

exports["default"] = Trip;