"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _users = _interopRequireDefault(require("../models/users"));

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _errorHandlers = _interopRequireDefault(require("../helpers/errorHandlers"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

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
      var schema = _joi["default"].object().keys({
        email: _joi["default"].string().required().email(),
        password: _joi["default"].string().required()
      }); // validate inputs...


      _joi["default"].validate(req.body, schema, function (err, result) {
        if (err) {
          res.status(422).json({
            status: 'error',
            error: err.message
          });
        } else {
          _users["default"].userExist(req, res).then(function (r) {
            var token = _jsonwebtoken["default"].sign({
              user: r.rows[0]
            }, process.env.SECRET_KEY, {
              expiresIn: '1h'
            });

            var id = r.rows[0].id;
            var isAdmin = r.rows[0].is_admin;
            var output = {
              status: 'success',
              data: {
                user_id: id,
                is_admin: isAdmin,
                token: token
              }
            };

            _users["default"].updateLastLogin(id);

            res.status(200).json(output);
          })["catch"](function (e) {
            res.status(500).json({
              status: 'error',
              error: 'an error occurred'
            });
          });
        }
      });
    }
  }]);

  return SignupController;
}();

exports["default"] = SignupController;