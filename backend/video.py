import cv2
import os

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

images = [img for img in os.listdir(image_folder) if img.endswith(".jpg")]
frame = cv2.imread(os.path.join(image_folder, images[0]))
height, width, layers = frame.shape

video = cv2.VideoWriter(video_name, 0, 0.6, (width,height))

for image in images:
    video.write(cv2.imread(os.path.join(image_folder, image)))

cv2.destroyAllWindows()
video.release()



from moviepy.editor import *
  
   
# loading video dsa gfg intro video
clip = VideoFileClip("assets/videos/video.avi")
  
  
# # getting only first 5 seconds
clip = clip.subclip(0, 6)
  
# loading audio file
audioclip = AudioFileClip("assets/audio/example.mp3").subclip(10, 16)
  
# adding audio to the video clip
videoclip = clip.set_audio(audioclip)
  
videoclip.write_videofile("assets/videos/video_with_audio.webm")
# showing video clip
# videoclip.ipython_display()