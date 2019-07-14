"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bus = _interopRequireDefault(require("../models/bus"));

var _errorHandlers = _interopRequireDefault(require("../helpers/errorHandlers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var BusMiddleware =
/*#__PURE__*/
function () {
  function BusMiddleware() {
    _classCallCheck(this, BusMiddleware);
  }

  _createClass(BusMiddleware, null, [{
    key: "busExist",
    value: function busExist(req, res, next) {
      _bus["default"].select(req.params.id).then(function (r) {
        if (r.rowCount > 0) {
          return next();
        } else {
          _errorHandlers["default"].notFoundError(req, res, 'bus not found');
        }
      })["catch"](function (e) {
        return _errorHandlers["default"].serverError(req, res);
      });
    }
  }]);

  return BusMiddleware;
}();

exports["default"] = BusMiddleware;