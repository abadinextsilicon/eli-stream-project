const fs = require('fs'); // Importing the file system module to handle file operations
const { PATHS } = require('./constants'); // Importing PATHS from the constants file
const logger = require('./utils/logger'); // Importing the logger utility

// VideoStreamer class to handle video streaming
class VideoStreamer {
    // Constructor to initialize the class with a file path
    constructor(filePath) {
        this.filePath = filePath; // Storing the file path
    }

    // Method to stream video content
    streamVideo(req, res) {
        // Using fs.stat to check file details
        fs.stat(this.filePath, (err, stat) => {
            if (err) {
                // Logging and sending a server error response if there's a file error
                logger.error(`File stat error for ${this.filePath}`, err);
                res.sendStatus(500);
                return;
            }

            // Getting streaming options based on the request's range header
            const options = this._getStreamOptions(req.headers.range, stat.size);
            // Writing response headers
            res.writeHead(options.statusCode, options.headers);

            // Creating a read stream for the video file
            const videoStream = fs.createReadStream(this.filePath, options.rangeOptions);
            videoStream.on('error', error => {
                // Logging and sending a server error response if there's a stream error
                logger.error(`Error reading file ${this.filePath}`, error);
                res.sendStatus(500);
            });
            // Piping the video stream to the response
            videoStream.pipe(res);
        });
    }

    // Private method to calculate the stream options
    _getStreamOptions(rangeHeader, fileSize) {
        const rangeOptions = {}; // Object to hold range options
        let statusCode = 200; // Default status code
        let start, end; // Declare start and end variable

        // Handling range requests
        if (rangeHeader) {
            const [startStr, endStr] = rangeHeader.replace(/bytes=/, "").split("-");
            start = parseInt(startStr);
            end = endStr ? parseInt(endStr) : fileSize - 1;
            rangeOptions.start = start;
            rangeOptions.end = end;
            statusCode = 206; // Partial content status code
        }

        // Setting up response headers
        const headers = {
            'Content-Type': 'video/mp4',
            'Content-Length': rangeOptions.end ? (rangeOptions.end - rangeOptions.start + 1) : fileSize,
            'Accept-Ranges': 'bytes'
        };
        if (rangeHeader) {
            headers['Content-Range'] = `bytes ${start || 0}-${end || (fileSize - 1)}/${fileSize}`;
        }

        return { rangeOptions, statusCode, headers }; // Returning the options
    }
}

module.exports = VideoStreamer; // Exporting the VideoStreamer class
