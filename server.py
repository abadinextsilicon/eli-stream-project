from flask import Flask, request
import random
import os
import logging
from pylive555 import LiveServerMediaSession, Live555MediaServer

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
                # Create a LiveServerMediaSession
                media_session = LiveServerMediaSession()
                media_session.add_file(file_path)

                # Create a Live555MediaServer
                media_server = Live555MediaServer()
                media_server.add_server_media_session(media_session, path=filename)

                # Start the media server on the specified port
                media_server.start(port)

                # Return the allocated port to the client
                return {'port': port}, 200
    except Exception as e:
        logging.error(f"An error occurred: {e}")
        return {"error": "An error occurred"}, 500

# Run the Flask server on port 1000
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=1000)
