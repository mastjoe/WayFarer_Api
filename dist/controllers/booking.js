"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _booking = _interopRequireDefault(require("../models/booking"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _errorHandlers = _interopRequireDefault(require("../helpers/errorHandlers"));

var _successHandler = _interopRequireDefault(require("../helpers/successHandler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var BookingController =
/*#__PURE__*/
function () {
  function BookingController() {
    _classCallCheck(this, BookingController);
  }

  _createClass(BookingController, null, [{
    key: "findAllBookings",
    value: function findAllBookings(req, res) {
      var decoded = _jsonwebtoken["default"].verify(req.token, process.env.SECRET_KEY);

      var adminStatus = decoded.user.is_admin;

      if (adminStatus) {
        // admin...
        _booking["default"].findAll(req, res).then(function (r) {
          return _successHandler["default"].successReport(req, res, r.rows);
        })["catch"](function (e) {
          return _errorHandlers["default"].serverError(req, res);
        });
      } else {
        // not admin...
        _booking["default"].find(decoded.user.id).then(function (r) {
          return _successHandler["default"].successReport(req, res, r.rows);
        })["catch"](function (e) {
          return _errorHandlers["default"].serverError(req, res);
        });
      }
    }
  }, {
    key: "book",
    value: function book(req, res) {
      var schema = _joi["default"].object().keys({
        seat_number: _joi["default"].required(),
        trip_id: _joi["default"].required()
      });

      _joi["default"].validate(req.body, schema, function (err, values) {
        if (err) {
          _errorHandlers["default"].validationError(req, res, err.message);
        } else {
          _booking["default"].create(req, res).then(function (r) {
            _successHandler["default"].successReport(req, res, r.rows[0]);
          })["catch"](function (e) {
            return _errorHandlers["default"].serverError(req, res, 'error in booking ticket');
          });
        }
      });
    }
  }, {
    key: "deleteBooking",
    value: function deleteBooking(req, res) {
      _booking["default"]["delete"](req, res).then(function (r) {
        return res.send('deleted');
      })["catch"](function (e) {
        return res.send('not deleted' + e);
      });
    }
  }]);

  return BookingController;
}();

exports["default"] = BookingController;