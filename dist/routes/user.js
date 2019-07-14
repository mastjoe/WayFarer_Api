"use strict";

var _express = _interopRequireDefault(require("express"));

var _user = _interopRequireDefault(require("../controllers/user"));

var _user2 = _interopRequireDefault(require("../middlewares/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.get('/', _user["default"].allUsers);
router.get('/:id', _user2["default"].userExist, _user["default"].findUser);
router.put('/make-admin/:id', _user2["default"].userExist, _user["default"].makeAdmin);
module.exports = router;