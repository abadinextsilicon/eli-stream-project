import requests
import logging
import sys
import vlc
import tkinter as tk
from tkinter import messagebox

# Initialize logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# Define the server address and port
server_address = '127.0.0.1'
server_port = 1000
filename = "Harry.Potter.and.the.Half.Blood.Prince.REPACK.1080p.BluRay.x264-METiS.HebSub.www.Moridim.tv.mkv"  # specify filename here
quality = '720p'

# Function to send a POST request to the server to start a streaming session
def start_stream():
    try:
        response = requests.post(f'http://{server_address}:{server_port}/stream', json={'filename': filename, 'quality': quality})
        if response.status_code != 200:
            logging.error(f"Server returned status code {response.status_code}: {response.text}")
            exit()
        port = response.json().get('port')
        if port is None:
            logging.error("No port allocated by server.")
            exit()
        logging.info(f"Allocated Port: {port}")
        media = instance.media_new(f'http://{server_address}:{port}')
        player.set_media(media)
        player.play()
    except Exception as e:
        logging.error(f"An error occurred: {e}")

# Create an instance of the VLC player
instance = vlc.Instance()
player = instance.media_player_new()

# Create the main window
root = tk.Tk()
root.title("Video Streaming Client")

# Create and place the buttons on the window
play_button = tk.Button(root, text="Play Stream", command=start_stream)
play_button.pack(side="left")
pause_button = tk.Button(root, text="Pause Stream", command=player.pause)
pause_button.pack(side="left")
stop_button = tk.Button(root, text="Stop Stream", command=player.stop)
stop_button.pack(side="left")
exit_button = tk.Button(root, text="Exit", command=root.quit)
exit_button.pack(side="left")

# Run the Tkinter event loop
root.mainloop()
