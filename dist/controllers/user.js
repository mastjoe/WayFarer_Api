"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _errorHandlers = _interopRequireDefault(require("../helpers/errorHandlers"));

var _user = _interopRequireDefault(require("../models/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var UsersController =
/*#__PURE__*/
function () {
  function UsersController() {
    _classCallCheck(this, UsersController);
  }

  _createClass(UsersController, null, [{
    key: "allUsers",
    value: function allUsers(req, res) {
      _user["default"].findAll(req, res).then(function (r) {
        return res.status(200).json(r.rows);
      })["catch"](function (e) {
        return res.status(5000).json({
          status: 'error',
          error: 'something went wrong'
        });
      });
    }
  }, {
    key: "findUser",
    value: function findUser(req, res) {
      _user["default"].find(req.params.id).then(function (r) {
        return res.status(200).json(r.rows[0]);
      })["catch"](function (e) {
        return _errorHandlers["default"].serverError(req, res);
      });
    }
  }, {
    key: "makeAdmin",
    value: function makeAdmin(req, res) {
      _user["default"].assignAdmin(req.params.id).then(function (r) {
        res.status(200).json({
          status: 'success',
          data: {
            message: 'user successfully assigned admin'
          }
        });
      })["catch"](function (e) {
        return _errorHandlers["default"].serverError(req, res);
      });
    }
  }]);

  return UsersController;
}();

exports["default"] = UsersController;