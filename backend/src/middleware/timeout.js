const timeout = require('connect-timeout');

// Middleware function to handle request timeouts
const requestTimeout = timeout('15s'); // Timeout duration, e.g., '15s', '1m', '10000ms'

module.exports = requestTimeout;
