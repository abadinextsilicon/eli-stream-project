// index.js: Main server file for the video streaming application.
// This file sets up an Express server, configures routes, and handles video streaming.

const express = require('express'); // Import the Express framework for creating the server and handling routes.
const os = require('os'); // Import Node's OS module for accessing operating system-level properties.
const axios = require('axios'); // Import Axios for making HTTP requests (used for fetching public IP).
const fs = require('fs'); // Import Node's file system module for file operations.
const { PATHS, PORT } = require('./constants'); // Import PATHS and PORT from constants.js.
const VideoStreamer = require('./VideoStreamer'); // Import VideoStreamer class for handling the streaming logic.
const logger = require('./utils/logger'); // Import a custom logging utility.
const videoFiles = require('./videoFiles'); // Import a utility to get a list of video files.

// Create an instance of the Express application.
const app = express();

// Serve static files from the 'public' directory.
app.use(express.static('public'));

// Loop through each video file and create a streaming route.
videoFiles.forEach(file => {
    const videoStreamer = new VideoStreamer(`${PATHS.VIDEOS}/${file}`);
    app.get(`/video-stream/${file}`, (req, res) => {
        logger.log(`Streaming video: ${file}`); // Log the video streaming action.
        videoStreamer.streamVideo(req, res); // Stream the video.
    });
});

// Endpoint to provide the list of available video files.
app.get('/video-list', (req, res) => {
    logger.log('Serving video list'); // Log the action of serving the video list.
    res.json(videoFiles); // Send the list of video files as a JSON response.
});

// Function to retrieve the server's local IP address.
function getLocalIpAddress() {
    const networkInterfaces = os.networkInterfaces();
    for (const interface in networkInterfaces) {
        for (const networkInterface of networkInterfaces[interface]) {
            if (!networkInterface.internal && networkInterface.family === 'IPv4') {
                logger.log(`Local IP Address: ${networkInterface.address}`); // Log the local IP address.
                return networkInterface.address;
            }
        }
    }
    return 'localhost';
}

// Function to retrieve the server's public IP address.
async function getPublicIpAddress() {
    try {
        const response = await axios.get('https://api.ipify.org?format=json');
        const publicIp = response.data.ip;
        logger.log(`Public IP Address: ${publicIp}`); // Log the public IP address.
        return publicIp;
    } catch (err) {
        logger.error('Error fetching public IP address:', err); // Log any error that occurs.
        return 'Error fetching IP';
    }   
}

// Main function to start the server.
async function main() {
    const ipAddress = getLocalIpAddress(); // Get the local IP address.
    app.listen(PORT, () => {
        logger.log(`Server running on http://${ipAddress}:${PORT}`); // Log the server start-up.
    });
}

main(); // Execute the main function to start the server.
