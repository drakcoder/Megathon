# import speech_recognition as sr
import translators as ts
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials

# def takeCommandHindi():
         
#     r = sr.Recognizer()
#     with sr.Microphone() as source:
          

#         print('Listening')
#         r.pause_threshold = 0.6
#         r.adjust_for_ambient_noise(source)
#         audio = r.listen(source)  
#         try:
#             print("Recognizing")
#             Query = r.recognize_google(audio, language='hi-In')
              
#             print("the query is printed='", Query, "'")
#             print(ts.bing(Query))
          

#         except Exception as e:
#             print(e)  
#             print("Say that again sir")
#             return "None"
#         return Query

# takeCommandHindi()

def getSong(song):
    sp = spotipy.Spotify(auth_manager=SpotifyClientCredentials(client_id="1bbc26bf3d92460ba5dec599b34cf3ab",
                                                           client_secret="6e0aaf498fed442388c0a669ff34c25f"))

    results = sp.search(q=song, limit=20)
    songs=[]
    for idx, track in enumerate(results['tracks']['items']):
        print(idx, track['name'])
        songs.append(track['name'])
    return songs    


def HandleQuery(body):
    query=body['query']
    converted=ts.bing(query)
    converted=converted.split(' ')
    if converted[0].lower()=='play':
            song=''
            for w in converted[1:]:
                    song+=w+' '
            songs=getSong(song)
            return songs
    if converted[0].lower()=='shut':
        if converted[1]=='the' and converted[2]=='door':
            if body['running']:
                return False
            else:
                return "Closing the door"
