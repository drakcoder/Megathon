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