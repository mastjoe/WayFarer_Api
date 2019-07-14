"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

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
    key: "addBus",
    value: function addBus(req, res) {
      _jsonwebtoken["default"].verify(req.token, process.env.SECRET_KEY, function (err, decoded) {
        res.json(decoded);
      });
    }
  }]);

  return BusController;
}();

exports["default"] = BusController;