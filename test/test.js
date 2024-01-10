


const axios = require('axios'); // Importing axios for HTTP requests
const { expect } = require('chai'); // Importing expect from chai for assertions
const { PORT } = require('../constants'); // Importing PORT from constants
const files = require('../videoFiles'); // Importing the list of video files

const SERVER_URL = `http://0.0.0.0:${PORT}`; // Setting the server URL
const numberOfParallelRequests = 100; // Number of parallel requests to simulate

// Function to simulate a random request to the server
async function simulateRandomRequest() {
  // Selecting a random file from the list
  const randomIndex = Math.floor(Math.random() * files.length);
  const file = files[randomIndex];
  // Simulating a request to the selected file
  return simulateRequest(`/video-stream/${file}`);
}

// Function to simulate a specific request
async function simulateRequest(endpoint) {
  try {
    // Sending a HEAD request to check if the stream is available
    const response = await axios.head(`${SERVER_URL}${endpoint}`);
    return response.status; // Returning the status of the response
  } catch (error) {
    // Handling any errors and returning a status code
    return error.response ? error.response.status : 500;
  }
}

// Mocha test suite
describe('Server Concurrency Test', function() {
  this.timeout(20000); // Setting a timeout for the test

  // Test to check if the server can handle multiple requests in parallel
  it('should handle multiple requests in parallel', async function() {
    const requests = [];
    // Generating a list of promises for parallel requests
    for (let i = 0; i < numberOfParallelRequests; i++) {
      requests.push(simulateRandomRequest());
    }

    // Awaiting the resolution of all requests
    const results = await Promise.all(requests);
    // Asserting that each request was successful
    results.forEach(status => expect(status).to.equal(200)); 
  });
});
