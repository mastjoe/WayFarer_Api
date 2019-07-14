"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _pg = require("pg");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var pool = new _pg.Pool();

var Bus = function Bus() {
  _classCallCheck(this, Bus);
};

exports["default"] = Bus;