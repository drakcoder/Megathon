import requests

url = 'http://localhost:5000/search_song'
myobj = {'song_name': 'hello'}

x = requests.post(url, json = myobj)



print(x.json())