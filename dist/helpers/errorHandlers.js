"use strict";

module.exports = {
  serverError: function serverError(req, res) {
    var msg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'An error occurred';
    var status = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 500;
    res.status(status).json({
      status: 'error',
      error: msg
    });
  }
};