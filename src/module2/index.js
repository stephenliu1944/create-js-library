/**
 * Demo
 */
function module2(message) {
    this.message = message;
}

module2.prototype.getMessage = function() {
    return this.message;
};

export default module2;