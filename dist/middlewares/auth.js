"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Auth =
/*#__PURE__*/
function () {
  function Auth() {
    _classCallCheck(this, Auth);
  }

  _createClass(Auth, null, [{
    key: "verifyToken",
    value: function verifyToken(req, res, next) {
      // const bearerHeader = req.headers.authorization || req.headers.token ;
      var bearerHeader = req.headers.token; // if (typeof bearerHeader !== 'undefined') {

      if (bearerHeader != '') {
        // if (req.headers.authorization) {
        //     const bearerToken = bearerHeader.split(' ')[1];
        //     req.token = bearerToken;
        // } else {
        //     req.token = req.headers.token;
        // }
        req.token = bearerHeader;
        return Auth.validateToken(req, res, next);
      } else {
        res.status(403).json({
          status: 'error',
          error: 'unauthorized operation'
        });
      }
    }
  }, {
    key: "validateToken",
    value: function validateToken(req, res, next) {
      _jsonwebtoken["default"].verify(req.token, process.env.SECRET_KEY, function (err, decoded) {
        if (err) {
          res.status(403).json({
            status: 'error',
            error: 'Unauthorized token'
          });
        } else {
          req.is_admin = decoded.user.is_admin;
          return next();
        }
      });
    }
  }]);

  return Auth;
}();

exports["default"] = Auth;