"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bus = _interopRequireDefault(require("../models/bus"));

var _trip = _interopRequireDefault(require("../models/trip"));

var _booking = _interopRequireDefault(require("../models/booking"));

var _errorHandlers = _interopRequireDefault(require("../helpers/errorHandlers"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var BookingMiddleware =
/*#__PURE__*/
function () {
  function BookingMiddleware() {
    _classCallCheck(this, BookingMiddleware);
  }

  _createClass(BookingMiddleware, null, [{
    key: "seatReg",
    value: function seatReg(req, res, next) {
      if ('seat_number' in req.body) {
        return next();
      } else {
        res.status(422).json({
          status: 'error',
          error: 'seat number is required'
        });
      }
    } // check if trip id is valid...

  }, {
    key: "checkTripId",
    value: function checkTripId(req, res, next) {
      _trip["default"].find(req.body.trip_id).then(function (r) {
        if (r.rowCount > 0) {
          return next();
        } else {
          res.status(400).json({
            status: 'error',
            error: "trip id of ".concat(req.body.trip_id, " is invalid")
          });
        }
      })["catch"](function (e) {
        return _errorHandlers["default"].serverError(req, res);
      });
    } // check if seat is available against trip id...

  }, {
    key: "checkTripBooking",
    value: function checkTripBooking(req, res, next) {
      _booking["default"].checkTripSeat(req, res).then(function (r) {
        if (r.rowCount == 0) {
          return BookingMiddleware.checkTripId(req, res, next);
        } else {
          _errorHandlers["default"].validationError(req, res, "seat number ".concat(req.body.seat_number, " is already picked"));
        }
      })["catch"](function (e) {
        return _errorHandlers["default"].serverError(req, res);
      });
    }
  }, {
    key: "bookingOwner",
    value: function bookingOwner(req, res, next) {
      var _jwt$verify = _jsonwebtoken["default"].verify(req.token, process.env.SECRET_KEY),
          user = _jwt$verify.user;

      var userId = user.id;
      var bookingId = req.params.id;

      _booking["default"].select(bookingId).then(function (r) {
        if (userId == r.rows[0].user_id) {
          return next();
        } else {
          _errorHandlers["default"].serverError(req, res, 'sorry user don\'t own booking');
        }
      })["catch"](function (e) {
        return _errorHandlers["default"].serverError(req, res, 'could not delete booking', 400);
      });
    }
  }]);

  return BookingMiddleware;
}();

exports["default"] = BookingMiddleware;