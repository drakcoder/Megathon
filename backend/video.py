import cv2
import os
import requests
from moviepy.editor import *
import pyrebase

image_folder = 'assets/images/'
video_name = 'assets/videos/video.avi'

data = [
    {
        'name': 'IIIT Hyderabad',
        'image': 'assets/images/IIIT-Hyderabad.jpg'    
    },
    {
        'name': 'Hussain Sagar',
        'image': 'assets/images/hussain_sagar.jpg'    
    },
    {
        'name': 'Birla Mandir',
        'image': 'assets/images/Birla_Mandir.jpg'    
    },
    {
        'name': 'Bio Diversity Park',
        'image': 'assets/images/biodiversity_part.jpg' 
    }
]

config = {
    "apiKey": "AIzaSyCe8TQi9sI7bx6YiVkcz6yc3BJEcdJgA_o",
    "authDomain": "stellantis-50189.firebaseapp.com",
    "projectId": "stellantis-50189",
    "storageBucket": "stellantis-50189.appspot.com",
    "messagingSenderId": "598770917117",
    "appId": "1:598770917117:web:e257d4aa9c3fe9db86a894",
    "measurementId": "G-SWCG6Y5JMT",
    "serviceAccount": "assets/keys/serviceAccount.json",
    "databaseURL": "https://stellantis-50189-default-rtdb.firebaseio.com"
}


# showing video clip
# videoclip.ipython_display()

def getVideo(mp3_url):
    images = [img for img in os.listdir(image_folder) if img.endswith(".jpg")]
    frame = cv2.imread(os.path.join(image_folder, images[0]))
    height, width, layers = frame.shape

    video = cv2.VideoWriter(video_name, 0, 0.6, (width,height))

    for image in images:
        video.write(cv2.imread(os.path.join(image_folder, image)))

    cv2.destroyAllWindows()
    video.release()
    
    
    # loading video dsa gfg intro video
    clip = VideoFileClip("assets/videos/video.avi")
    
    clip = clip.subclip(0, 6)


    mp3_url = 'https://p.scdn.co/mp3-preview/dff3697d38fe2313aa2d3c594039377bfd520c04?cid=37f5cdbd24004b1db95e46a7a37b9d8e'
    response = requests.get(mp3_url)
    mp3_file = open('assets/audio/example.mp3', 'wb')
    mp3_file.write(response.content)
    audioclip = AudioFileClip("assets/audio/example.mp3").subclip(10, 16)
    
    # adding audio to the video clip
    videoclip = clip.set_audio(audioclip)
    videoclip.write_videofile("assets/videos/video_with_audio.webm")

    firebase = pyrebase.initialize_app(config)
    storage = firebase.storage()
    storage.child("video_with_audio.webm").put("assets/videos/video_with_audio.webm")
    
    

getVideo('https://p.scdn.co/mp3-preview/dff3697d38fe2313aa2d3c594039377bfd520c04?cid=37f5cdbd24004b1db95e46a7a37b9d8e')

