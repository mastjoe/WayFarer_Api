"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _pg = require("pg");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var table = 'buses';
var pool = new _pg.Pool();

var Bus =
/*#__PURE__*/
function () {
  function Bus() {
    _classCallCheck(this, Bus);
  }

  _createClass(Bus, null, [{
    key: "addBus",
    value: function addBus(req, res) {
      var sql = "INSERT INTO ".concat(table, " (number_plate, manufacturer, model, year, capacity, created_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *");
      var values = [req.body.number_plate, req.body.manufacturer, req.body.model, req.body.year, req.body.capacity, new Date()];
      return pool.query(sql, values);
    }
  }, {
    key: "deleteBus",
    value: function deleteBus(id) {
      var sql = "DELETE FROM ".concat(table, " WHERE id = '").concat(id, "'");
      return pool.query(sql);
    }
  }, {
    key: "select",
    value: function select(id) {
      var sql = "SELECT * FROM ".concat(table, " WHERE id='").concat(id, "'");
      return pool.query(sql);
    }
  }, {
    key: "findAll",
    value: function findAll(req, res) {
      var sql = "SELECT * FROM ".concat(table);
      return pool.query(sql);
    }
  }]);

  return Bus;
}();

exports["default"] = Bus;