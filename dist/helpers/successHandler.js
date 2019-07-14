"use strict";

module.exports = {
  successReport: function successReport(req, res, msg) {
    res.status(200).json({
      status: 'success',
      data: msg
    });
  },
  successMessageReport: function successMessageReport(req, res) {
    var msg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'operation was successful';
    res.status(200).json({
      status: 'success',
      data: {
        message: msg
      }
    });
  }
};