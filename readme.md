# Video Streaming Application

This README provides a guide to the video streaming application, covering its design, structure, and usage instructions.

## Overview
This application provides a Node.js/Express-based platform for efficient and scalable video streaming. 

## File Structure and Responsibilities
- `index.js`: Main entry point for the server.
- `constants.js`: Global constants like server port and file paths.
- `utiles/logger.js`: Logging functionality.
- `VideoStreamer.js`: Logic for streaming video content.
- `videoFiles.js`: Management of video files.
- `package.json`: Project metadata and dependencies.
- `test/test.js`: Tests for server load and concurrency.
- `public/index.html`: User interface for video streaming.

## Installation and Usage Guide
1. **Clone the Repository**: `git clone [repository URL]` or download it 
2. **Install Dependencies**: `npm install`
3. **Running the Application**: `npm start`
4. **Accessing the Interface**: Go to `http://localhost:3000`
5. **Running Tests**: `npm test`

## Additional Notes
- Node.js is required.
- Place videos in the designated directory as specified in `videos/`.


# Application Structure and Design

## Structure Overview
The video streaming application is structured into several key components:
- **Frontend**: The user interface, developed using HTML, CSS, and JavaScript. It dynamically displays video content to users.
- **Backend**: Built with Node.js and Express, handling API requests, video streaming logic, and server-side operations.
- **File System**: Stores and manages the video files.

## Design Principles
- **Modularity**: The application is designed with a modular approach, separating concerns and allowing for easy maintenance and scalability.
- **Performance Optimization**: Emphasis on efficient streaming protocols and server configurations to ensure high performance.
- **Responsive Design**: The frontend is designed to be responsive, providing a seamless viewing experience across various devices and screen sizes.


## Architecture
- **Client-Server Model**: The application follows a client-server architecture where the server handles streaming, and the client manages user interactions.
- **RESTful API Design**: The backend provides RESTful APIs for frontend communication, ensuring a standard protocol for data exchange.

## Technologies Used
- **Frontend**: HTML5, CSS3, JavaScript
- **Backend**: Node.js, Express.js
- **Streaming Protocols**: elivering video content over standard HTTP requests, which is a common approach for on-demand video streaming 

## Design Considerations
- **Scalability**: The system is designed to handle an increasing number of requests and data volume.
- **Usability**: User-friendly interface with intuitive navigation and controls.
- **Accessibility**: Adheres to accessibility standards for wider audience reach.

This section provides an insight into the overall structure and design ethos of the video streaming application, highlighting the key components and principles that drive its development.



# File Structure and Responsibilities

## Project Files Overview
This section describes the key files in the project and their specific roles:

### `index.js`
- **Responsibility**: Serves as the main entry point of the application. Initializes the Express server and routes.

### `constants.js`
- **Responsibility**: Contains global constants like server port and file paths, used across the application.

### `logger.js`
- **Responsibility**: Provides logging functionality for both standard and error logs.

### `VideoStreamer.js`
- **Responsibility**: Handles the logic for streaming video content, dealing with various HTTP requests.

### `videoFiles.js`
- **Responsibility**: Manages the retrieval and listing of video files from the server's filesystem.

### `package.json`
- **Responsibility**: Maintains project metadata, dependencies, and scripts for the Node.js environment.

### `test.js`
- **Responsibility**: Includes tests for the application, focusing on server load and concurrency handling.

### `index.html`
- **Responsibility**: The HTML file for the front-end, providing the user interface for video streaming.

This structure provides a modular and organized approach, ensuring efficient maintenance and scalability of the video streaming application.


## Network Protocols

### HTTP/HTTPS
Our application leverages HTTP for video streaming. In `VideoStreamer.js`, we handle HTTP requests and responses for video content. This includes setting headers and streaming video data based on range requests, which allows for efficient streaming and fast access to different parts of the video.

### TCP/IP
TCP/IP ensures reliable and ordered data transmission, a cornerstone for streaming over the internet. Our application, built on Node.js and Express, inherently utilizes TCP/IP for managing the network communication. This ensures a stable and consistent video streaming experience for the users.

### Range Requests
Implemented in the `VideoStreamer` class, range requests are a pivotal feature of the HTTP protocol used in our app. This functionality enables partial content delivery, allowing users to request and receive specific parts of video files. This feature is particularly beneficial for large video files, offering improved user experience by facilitating quick access to different segments of the video without needing to download the entire file.

### Open Source Technologies
Our application is built using open-source technologies such as Node.js and Express. These technologies provide a robust and flexible foundation for developing high-performance video streaming solutions. By leveraging these open-source tools, we ensure our application remains scalable, maintainable, and up-to-date with the latest advancements in web technology.






# Video Streaming Application - Testing Approach

## Overview
This document outlines the testing approach for the video streaming application, focusing on concurrency and response reliability under high load.

## Testing Approach

### Concurrency Testing
- **Objective**: To evaluate the server's ability to handle multiple simultaneous requests.
- **Method**: Simulating a large number of parallel requests using asynchronous HTTP calls.
- **Tools**: Custom scripts employing asynchronous JavaScript features.

### HTTP Request Simulation
- **Objective**: To verify the availability and responsiveness of the video streams.
- **Method**: Using `axios` to send HEAD or GET requests with limited ranges to the server.
- **Verification**: Ensuring each request successfully returns a response.

### Automated Testing
- **Framework**: Mocha for test structuring and Chai for assertions.
- **Focus**: Assessing the server's capacity to handle concurrent requests without degradation in performance or stability.

### Stress Testing
- **Objective**: To ensure the server's stability and responsiveness under stress.
- **Method**: Analyzing the response status of each request under simulated high load conditions.

## Conclusion
The testing strategy is designed to rigorously assess the server's performance and stability, ensuring a robust and reliable video streaming service.

---

For more detailed information on each test and its implementation, refer to the respective test scripts and documentation.
