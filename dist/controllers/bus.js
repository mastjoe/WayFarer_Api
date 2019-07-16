"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _errorHandlers = _interopRequireDefault(require("../helpers/errorHandlers"));

var _successHandler = _interopRequireDefault(require("../helpers/successHandler"));

var _bus = _interopRequireDefault(require("../models/bus"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var BusController =
/*#__PURE__*/
function () {
  function BusController() {
    _classCallCheck(this, BusController);
  }

  _createClass(BusController, null, [{
    key: "getAllBus",
    value: function getAllBus(req, res) {
      _bus["default"].findAll(req, res).then(function (r) {
        return _successHandler["default"].successReport(req, res, r.rows);
      })["catch"](function (e) {
        return _errorHandlers["default"].serverError(req, res);
      });
    }
  }, {
    key: "addBus",
    value: function addBus(req, res) {
      var schema = _joi["default"].object().keys({
        number_plate: _joi["default"].string().required(),
        manufacturer: _joi["default"].string().required(),
        model: _joi["default"].string().required(),
        year: _joi["default"].string().min(4).max(4).required(),
        capacity: _joi["default"].number().min(3).integer().required()
      });

      _joi["default"].validate(req.body, schema, function (err, value) {
        if (err) {
          _errorHandlers["default"].validationError(req, res, err.message);
        } else {
          _bus["default"].addBus(req, res).then(function (r) {
            return _successHandler["default"].successReport(req, res, r.rows[0]);
          })["catch"](function (e) {
            return _errorHandlers["default"].serverError(req, res);
          });
        }
      });
    } // delete specific bus..

  }, {
    key: "deleteBus",
    value: function deleteBus(req, res) {
      _bus["default"].deleteBus(req.params.id).then(function (r) {
        return _successHandler["default"].successMessageReport(req, res, 'bus successfully deleted');
      })["catch"](function (e) {
        return _errorHandlers["default"].serverError(req, res);
      });
    } // find specific bus...

  }, {
    key: "findBus",
    value: function findBus(req, res) {
      _bus["default"].select(req.params.id).then(function (r) {
        return _successHandler["default"].successReport(req, res, r.rows[0]);
      })["catch"](function (e) {
        return _errorHandlers["default"].serverError(req, res);
      });
    }
  }]);

  return BusController;
}();

exports["default"] = BusController;