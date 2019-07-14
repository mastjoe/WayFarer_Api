"use strict";

var _express = _interopRequireDefault(require("express"));

var _bus = _interopRequireDefault(require("../controllers/bus"));

var _auth = _interopRequireDefault(require("../middlewares/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.post('/add', _bus["default"].addBus);
module.exports = router;