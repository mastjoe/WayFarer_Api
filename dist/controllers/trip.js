"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _trip = _interopRequireDefault(require("../models/trip"));

var _errorHandlers = _interopRequireDefault(require("../helpers/errorHandlers"));

var _successHandler = _interopRequireDefault(require("../helpers/successHandler"));

var _joi = _interopRequireDefault(require("@hapi/joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TripController =
/*#__PURE__*/
function () {
  function TripController() {
    _classCallCheck(this, TripController);
  }

  _createClass(TripController, null, [{
    key: "allTrips",
    value: function allTrips(req, res) {
      _trip["default"].findAll(req, res).then(function (r) {
        return _successHandler["default"].successReport(req, res, r.rows);
      })["catch"](function (e) {
        return _errorHandlers["default"].serverError(req, res);
      });
    }
  }, {
    key: "createTrip",
    value: function createTrip(req, res) {
      var schema = _joi["default"].object().keys({
        bus_id: _joi["default"].number().integer().required(),
        origin: _joi["default"].string().min(2).required(),
        destination: _joi["default"].string().min(2).required(),
        trip_date: _joi["default"].required(),
        fare: _joi["default"].number().required()
      });

      _joi["default"].validate(req.body, schema, function (err, values) {
        if (err) {
          _errorHandlers["default"].validationError(req, res, err.message);
        } else {
          _trip["default"].createTrip(req, res).then(function (r) {
            return _successHandler["default"].successReport(req, res, r.rows);
          })["catch"](function (e) {
            return _errorHandlers["default"].serverError(req, res);
          });
        }
      });
    }
  }]);

  return TripController;
}();

exports["default"] = TripController;