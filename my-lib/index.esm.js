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

export { module1, module2 };
