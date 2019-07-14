"use strict";

var _express = _interopRequireDefault(require("express"));

var _signup = _interopRequireDefault(require("../controllers/signup"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.post('/', _signup["default"].index);
module.exports = router;