"use strict";

var _express = _interopRequireDefault(require("express"));

var _signin = _interopRequireDefault(require("../controllers/signin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.post('/', _signin["default"].index);
module.exports = router;