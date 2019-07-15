"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _pg = require("pg");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var pool = new _pg.Pool();
var table = 'users';

var User =
/*#__PURE__*/
function () {
  function User() {
    _classCallCheck(this, User);
  }

  _createClass(User, null, [{
    key: "userIdExist",
    value: function userIdExist(id) {
      var sql = "SELECT * FROM ".concat(table, " WHERE id='").concat(id, "'");
      return pool.query(sql);
    }
  }, {
    key: "emailExist",
    value: function emailExist(req, res) {
      var checkSql = 'SELECT * FROM ' + table + ' WHERE email = \'' + req.body.email + '\'';
      return pool.query(checkSql);
    }
  }, {
    key: "createUser",
    value: function createUser(req, res) {
      var sql = "INSERT INTO ".concat(table, " (first_name, last_name, email, password, is_admin, created_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *");
      var values = [req.body.first_name, req.body.last_name, req.body.email, req.body.password, req.body.is_admin, new Date()];
      return pool.query(sql, values);
    }
  }, {
    key: "userExist",
    value: function userExist(req, res) {
      var sql = "SELECT * FROM ".concat(table, " WHERE email='").concat(req.body.email, "' AND password='").concat(req.body.password, "'");
      return pool.query(sql);
    }
  }, {
    key: "updateLastLogin",
    value: function updateLastLogin(id) {
      var sql = "UPDATE ".concat(table, " SET  last_login = $1 WHERE id=").concat(id);
      var values = [new Date()];
      pool.query(sql, values);
    }
  }, {
    key: "findAll",
    value: function findAll(req, res) {
      var sql = "SELECT * FROM ".concat(table);
      return pool.query(sql);
    }
  }, {
    key: "find",
    value: function find(id) {
      var sql = "SELECT * FROM ".concat(table, " WHERE id ='").concat(id, "'");
      return pool.query(sql);
    }
  }, {
    key: "assignAdmin",
    value: function assignAdmin(id) {
      var sql = "UPDATE ".concat(table, " SET is_admin='true' WHERE id ='").concat(id, "'");
      return pool.query(sql);
    }
  }]);

  return User;
}();

exports["default"] = User;