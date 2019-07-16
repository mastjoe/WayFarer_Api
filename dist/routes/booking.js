"use strict";

var _express = _interopRequireDefault(require("express"));

var _booking = _interopRequireDefault(require("../controllers/booking"));

var _bookings = _interopRequireDefault(require("../middlewares/bookings"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.get('/', _booking["default"].findAllBookings);
router.post('/', _booking["default"].book);
router["delete"]('/:id', _bookings["default"].bookingOwner, _booking["default"].deleteBooking);
module.exports = router;