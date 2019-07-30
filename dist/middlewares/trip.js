"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bus = _interopRequireDefault(require("../models/bus"));

var _trip = _interopRequireDefault(require("../models/trip"));

var _errorHandlers = _interopRequireDefault(require("../helpers/errorHandlers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TripMiddleware =
/*#__PURE__*/
function () {
  function TripMiddleware() {
    _classCallCheck(this, TripMiddleware);
  }

  _createClass(TripMiddleware, null, [{
    key: "tripBusExist",
    value: function tripBusExist(req, res, next) {
      _bus["default"].select(req.body.bus_id).then(function (r) {
        if (r.rowCount > 0) {
          return next();
        } else {
          return _errorHandlers["default"].notFoundError(req, res, "No bus has id ".concat(req.body.bus_id));
        }
      })["catch"](function (e) {
        return _errorHandlers["default"].serverError(req, res);
      });
    } // check if bus is embarking on another trip...

  }, {
    key: "checkTripBusUsage",
    value: function checkTripBusUsage(req, res, next) {
      _bus["default"].busHasPendingTrip(req, res).then(function (r) {
        if (r.rowCount > 0) {
          _errorHandlers["default"].validationError(req, res, 'bus is used for another trip');
        } else {
          return next();
        }
      })["catch"](function (e) {
        return _errorHandlers["default"].serverError(req, res);
      });
    }
  }, {
    key: "tripExist",
    value: function tripExist(req, res, next) {
      _trip["default"].find(req.params.id).then(function (r) {
        if (r.rowCount > 0) {
          return next();
        } else {
          _errorHandlers["default"].notFoundError(req, res, "Trip with id ".concat(req.params.id, " not found"));
        }
      })["catch"](function (e) {
        return _errorHandlers["default"].serverError(req, res);
      });
    }
  }]);

  return TripMiddleware;
}();

exports["default"] = TripMiddleware;