"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _user = _interopRequireDefault(require("../models/user"));

var _errorHandlers = _interopRequireDefault(require("../helpers/errorHandlers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var UserMiddleware =
/*#__PURE__*/
function () {
  function UserMiddleware() {
    _classCallCheck(this, UserMiddleware);
  }

  _createClass(UserMiddleware, null, [{
    key: "adminCheck",
    // use after token validation...
    value: function adminCheck(req, res, next) {
      var isAdmin = req.is_admin;

      if (req.is_admin) {
        return next();
      } else {
        res.status(403).json({
          status: 'error',
          error: 'Unauthorized admin'
        });
      }
    }
  }, {
    key: "userExist",
    value: function userExist(req, res, next) {
      var id = req.params.id;

      _user["default"].userIdExist(id).then(function (r) {
        if (r.rowCount > 0) {
          return next();
        } else {
          _errorHandlers["default"].notFoundError(req, res);
        }
      })["catch"](function (e) {
        return _errorHandlers["default"].serverError(req, res);
      });
    }
  }]);

  return UserMiddleware;
}();

exports["default"] = UserMiddleware;