"use strict";

var _express = _interopRequireDefault(require("express"));

var _trip = _interopRequireDefault(require("../controllers/trip"));

var _auth = _interopRequireDefault(require("../middlewares/auth"));

var _trip2 = _interopRequireDefault(require("../middlewares/trip"));

var _user = _interopRequireDefault(require("../middlewares/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.get('/', _trip["default"].allTrips);
router.get('/:id', _trip2["default"].tripExist, _trip["default"].findTrip);
router.post('/', _trip2["default"].tripBusExist, _user["default"].adminCheck, _trip["default"].createTrip);
module.exports = router;