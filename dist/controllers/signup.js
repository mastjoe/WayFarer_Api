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

var SignupController =
/*#__PURE__*/
function () {
  function SignupController() {
    _classCallCheck(this, SignupController);
  }

  _createClass(SignupController, null, [{
    key: "index",
    value: function index(req, res) {
      // validation schema...   
      var schema = _joi["default"].object().keys({
        first_name: _joi["default"].string().required(),
        last_name: _joi["default"].string().required(),
        email: _joi["default"].string().required().email(),
        password: _joi["default"].string().required().min(5)
      }); // validate inputs...


      _joi["default"].validate(req.body, schema, function (err, result) {
        if (err) {
          _errorHandlers["default"].serverError(req, res, err.message, 422);
        } else {
          // check if email exist previously...
          _user["default"].emailExist(req, res).then(function (_ref) {
            var rowCount = _ref.rowCount;

            if (rowCount > 0) {
              // email is taken...
              _errorHandlers["default"].serverError(req, res, 'email is taken already', 422);
            } else {
              // email is available...
              _user["default"].createUser(req, res).then(function (r) {
                res.status(201).json({
                  status: 'success',
                  data: r.rows[0]
                });
              })["catch"](function (e) {
                return _errorHandlers["default"].serverError(req, res, 'error on creating user');
              });
            }
          })["catch"](function (e) {
            return _errorHandlers["default"].serverError(req, res);
          });
        }
      });
    }
  }]);

  return SignupController;
}();

exports["default"] = SignupController;