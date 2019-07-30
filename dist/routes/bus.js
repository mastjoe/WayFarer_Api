"use strict";

var _express = _interopRequireDefault(require("express"));

var _bus = _interopRequireDefault(require("../controllers/bus"));

var _bus2 = _interopRequireDefault(require("../middlewares/bus"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.get('/', _bus["default"].getAllBus);
router.get('/:id', _bus2["default"].busExist, _bus["default"].findBus);
router.post('/', _bus2["default"].plateNumberExist, _bus["default"].addBus);
router["delete"]('/:id', _bus2["default"].busExist, _bus["default"].deleteBus);
module.exports = router;