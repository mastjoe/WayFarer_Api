"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _pg = require("pg");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var table = 'buses';
var tripTable = 'trips';
var pool = new _pg.Pool();

var Bus =
/*#__PURE__*/
function () {
  function Bus() {
    _classCallCheck(this, Bus);
  }

  _createClass(Bus, null, [{
    key: "addBus",
    value: function () {
      var _addBus = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var now, sql, values;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                now = new Date();
                sql = "INSERT INTO ".concat(table, " (number_plate, manufacturer, model, year, capacity, created_on, updated_on) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *");
                values = [req.body.number_plate, req.body.manufacturer, req.body.model, req.body.year, req.body.capacity, now, now];
                _context.next = 5;
                return pool.query(sql, values);

              case 5:
                return _context.abrupt("return", _context.sent);

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function addBus(_x, _x2) {
        return _addBus.apply(this, arguments);
      }

      return addBus;
    }()
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
  }, {
    key: "findPlateNumber",
    value: function findPlateNumber(number) {
      var sql = "SELECT * FROM ".concat(table, " WHERE number_plate='").concat(number, "'");
      return pool.query(sql);
    }
  }, {
    key: "busHasPendingTrip",
    value: function busHasPendingTrip(req, res) {
      var sql = "SELECT * FROM ".concat(tripTable, " WHERE bus_id = '").concat(req.body.bus_id, "' AND departed='0'");
      return pool.query(sql);
    }
  }]);

  return Bus;
}();

exports["default"] = Bus;