"use strict";

var _express = _interopRequireDefault(require("express"));

var _trip = _interopRequireDefault(require("../controllers/trip"));

var _auth = _interopRequireDefault(require("../middlewares/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.post('/create', _trip["default"].createTrip);
module.exports = router;