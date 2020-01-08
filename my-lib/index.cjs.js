'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * Demo
 */
function module1(message) {
  return message;
}

/**
 * Demo
 */
function module2(message) {
  this.message = message;
}

module2.prototype.getMessage = function () {
  return this.message;
};

exports.module1 = module1;
exports.module2 = module2;
