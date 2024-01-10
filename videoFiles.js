// videoFiles.js

// Importing required modules
const fs = require('fs'); // File system module for file operations
const { PATHS } = require('./constants'); // Importing PATHS from constants
const logger = require('./utils/logger'); // Importing logger utility

// Function to get the list of video files
function getVideoFiles() {
    logger.log('Reading video files from directory'); // Log the operation
    // Read the video directory and filter out files ending with .mp4
    return fs.readdirSync(PATHS.VIDEOS).filter(file => file.endsWith('.mp4'));
}

// Getting the list of video files
const videoFiles = getVideoFiles();
logger.log(`Found ${videoFiles.length} video files`); // Log the number of files found

// Exporting the list of video files
module.exports = videoFiles;
