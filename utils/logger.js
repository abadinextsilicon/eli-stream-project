// logger.js

// Function to log general messages
// @param {string} message - The message to be logged
function log(message) {
    // Logs the message to the console
    console.log(message);
}

// Function to log errors
// @param {string} errorMessage - The error message to be logged
// @param {Object} errorObj - The error object (optional)
function error(errorMessage, errorObj) {
    // Logs the error message to the console
    console.error(errorMessage);
    // Logs the error object to the console, if provided
    if (errorObj) console.error(errorObj);
}

// Exporting the log and error functions to be used in other files
module.exports = { log, error };
