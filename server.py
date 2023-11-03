from flask import Flask, request
import random
import os
import logging
import ctypes
from ctypes import c_char_p, c_int

# Initialize logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# Initialize the Flask application
app = Flask(__name__)

# Base directory where the video files are stored
base_dir = '/Users/aharon-abadi/Downloads/'

# Function to check if a port is in use
def is_port_in_use(port):
    try:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            s.bind(('localhost', port))
        return False  # Port is available
    except socket.error:
        return True  # Port is in use

# Load the live555 shared library
live555 = ctypes.CDLL('live555.dll')  # Replace with the path to your live555 library

# Define the live555 functions
live555.createMediaSession.argtypes = [c_char_p]
live555.createMediaSession.restype = c_void_p
live555.createMediaSubsession.argtypes = [c_void_p, c_int, c_int, c_int, c_int]
live555.createMediaSubsession.restype = c_void_p
live555.initializeMediaSession.argtypes = [c_void_p]
live555.initializeMediaSession.restype = None
live555.startMediaSession.argtypes = [c_void_p, c_int]
live555.startMediaSession.restype = None

# Define a route for streaming
@app.route('/stream', methods=['POST'])
def mystream():
    try:
        # Extract filename and quality from the client's request
        filename = request.json.get('filename')
        quality = request.json.get('quality')

        # Validate filename and quality
        if not filename or not quality:
            logging.error("Invalid filename or quality")
            return {"error": "Invalid filename or quality"}, 400

        # Construct the full file path by joining base directory and filename
        file_path = os.path.join(base_dir, filename)

        # Check if the file exists, return an error if not
        if not os.path.exists(file_path):
            logging.error(f"File not found: {file_path}")
            return {"error": "File not found"}, 404

        while True:
            # Generate a random port for streaming between 10000 and 65535
            port = random.randint(10000, 65535)
            if not is_port_in_use(port):
                # Create a live555 MediaSession
                media_session = live555.createMediaSession(file_path.encode())
                if media_session:
                    # Create a live555 MediaSubsession
                    media_subsession = live555.createMediaSubsession(media_session, 0, 0, 0, port)
                    if media_subsession:
                        # Initialize and start the live555 MediaSession
                        live555.initializeMediaSession(media_session)
                        live555.startMediaSession(media_session, port)
                        # Return the allocated port to the client
                        return {'port': port}, 200

    except Exception as e:
        logging.error(f"An error occurred: {e}")
        return {"error": "An error occurred"}, 500

# Run the Flask server on port 1000
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=1000)
