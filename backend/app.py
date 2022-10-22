
# Importing flask module in the project is mandatory
# An object of Flask class is our WSGI application.
import json
from flask import Flask, request
from languageConverter import HandleQuery
from flask_cors import CORS

# Packages for Spotify
from CONSTANTS import client_ID, client_SECRET, WEATHERS
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials, SpotifyOAuth
import types


# Flask constructor takes the name of
# current module (__name__) as argument.
app = Flask(__name__)
CORS(app)

# The route() function of the Flask class is a decorator,
# which tells the application which URL should call
# the associated function.


@app.route('/vc', methods=['GET', 'POST'])
# ‘/’ URL is bound with hello_world() function.
def vc():
    if request.method == 'POST':
        body = request.json
        result = HandleQuery(body)
        if result:
            return json.dumps({"result": result}), 200, {'ContentType': 'application/json'}
        else:
            return json.dumps({"result": False}), 403, {'ContentType': 'application/json'}


@app.route('/accident', methods=['GET', 'POST'])
def accident():
    if request.method == 'POST':
        body = request.json
        if body['airbags']:
            return json.dumps({"message": "authorities have been alerted about the accident"}), 200, {"ContentType": "application/json"}
        else:
            return json.dumps({"message": "no major accident occured"}), 403, {"ContentType": "application/json"}


# For recommendations according to weather
@app.route('/weather', methods=['GET', 'POST'])
def predict_based_weather():
    if request.method == 'POST':
        weather = request.json["weather"]
        print(weather, weather is WEATHERS.keys())
        if weather in WEATHERS.keys():
            random_song = random.choice(WEATHERS[weather])
            return json.dumps({"song_name": random_song}), 200, {'ContentType': 'application/json'}
        return json.dumps({"message": "Invalid weather name"}), 404, {'ContentType': 'application/json'}


# Spotify Recommendation
@app.route('/search_song', methods=['GET', 'POST'])
def search_song_by_name():
    if request.method == 'POST':
        song_name = request.json["song_name"]
        if(song_name):
            song_details = get_song(song_name)
            return json.dumps({"song_details": song_details}), 200, {'ContentType': 'application/json'}
        return json.dumps({"message": "Invalid song name"}), 404, {'ContentType': 'application/json'}


@app.route('/error')
def error():
    return "Some error occurred"


client_ID = '37f5cdbd24004b1db95e46a7a37b9d8e'
client_SECRET = '706496ba799c445295d345a346b35209'


def get_song(song_name):
    sp = spotipy.Spotify(auth_manager=SpotifyClientCredentials(client_id=client_ID,
                                                               client_secret=client_SECRET))

    results = sp.search(q=song_name, limit=1)
    for idx, track in enumerate(results['tracks']['items']):
        return {
            "name": track['name'],
            "artisits": [
                artist["name"] for artist in track["artists"]],
            "duration_ms": track["duration_ms"],
            'song_url': track['preview_url'],
            'cover art': track['album']['images'][0]['url']
        }


"""
# ================= Recently Played need to work ================================

@app.route('/authorize/')
def authorize():
    return "Work in progress"


@app.route('/get_previously_played')
def get_previously_played():
    previously_played_shows()
    return "Work in progress"


def previously_played_shows():
    sp = spotipy.Spotify(auth_manager=SpotifyOAuth(client_id=client_ID,
                                                   client_secret=client_SECRET,
                                                   scope="user-read-recently-played user-read-private user-top-read user-read-currently-playing",
                                                   redirect_uri="https://localhost:5000/authorize/"
                                                   ))

    def current_user_recently_played(self, limit=50):
        return self._get('me/player/currently-playing', limit=limit)

    sp.current_user_recently_played = types.MethodType(
        current_user_recently_played, sp)

    results = sp.current_user_recently_played()
    print(results)
    for idx, item in enumerate(results['items']):
        track = item['track']
        print(idx, track['artists'][0]['name'], " – ", track['name'])
"""

# main driver function
if __name__ == '__main__':

    # run() method of Flask class runs the application
    # on the local development server.
    app.run()
