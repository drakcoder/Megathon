import React from 'react'

var x_pos = 50
var y_pos = 0

function displayNextImage() {
    x = (x === images.length - 1) ? 0 : x + 1;
    document.getElementById("img").src = images[x];
    document.getElementById("title").innerHTML = titles[x];
    const oElement = document.getElementById("car")
    // alert(FindPosition(oElement))
    var d = document.getElementById('img');
    var d2 = document.getElementById('title');
    // var x_pos = FindPosition(oElement)[0] + 20
    // var y_pos = FindPosition(oElement)[1]
    d.style.position = "absolute";
    d2.style.position = "absolute";
    d.style.left = y_pos+'px';
    d2.style.left = y_pos+'px';
    d.style.top = (x_pos + 550)+'px';
    d2.style.top = (x_pos + 550)+'px';
    y_pos += 250
}

function displayPreviousImage() {
    x = (x <= 0) ? images.length - 1 : x - 1;
    document.getElementById("img").src = images[x];
    document.getElementById("title").innerHTML = titles[x];
    const oElement = document.getElementById("car")
    // alert(FindPosition(oElement))
}

function startTimer() {
    setInterval(displayNextImage, 7000);
}

function FindPosition(oElement)
{
  if(typeof( oElement.offsetParent ) != "undefined")
  {
    for(var posX = 0, posY = 0; oElement; oElement = oElement.offsetParent)
    {
      posX += oElement.offsetLeft;
      posY += oElement.offsetTop;
    }
      return [ posX, posY ];
    }
    else
    {
      return [ oElement.x, oElement.y ];
    }
}

var images = [], x = -1;
images[0] = "/assets/image1.jpg";
images[1] = "/assets/image2.jpg";
images[2] = "/assets/image3.jpg";

var titles = []
titles[0] = 'Bio Diversity Park'
titles[1] = 'Birla Mandir'
titles[2] = 'Hussain Sagar'

const theme_video = {
  'road trip': '/assets/video_with_road_trip.webm',
  'nature': '/assets/video_with_nature.webm',
  'party': '/assets/video_with_party.webm',
  'chill': '/assets/video_with_chill.webm',
  'emotional': '/assets/video_with_emotional.webm',
  'calming': '/assets/video_with_calm.webm'
}

function handleChange() {
  const d = document.getElementById("inputform").value;

  document.getElementById("myvideo").src = theme_video[d]
  console.log(d)
}


export default function Movie() {

    startTimer();

    return (
        <>
          <h2>A movie for a lifetime memory</h2>
          
          <div style={{'padding': '10px'}} onChange={handleChange}>
            <p style={{'display': 'inline'}}>Theme: </p>
            <select id="inputform" name="inputform" display="inline">
              <option value="road trip">road trip</option>
              <option value="nature">nature</option>
              <option value="party">party</option>
              <option value="chill">chill</option>
              <option value="emotional">emotional</option>
              <option value="calming">calming</option>
            </select>
          </div>
          <div>
            <video src={'/assets/video_with_audio.webm'} id="myvideo" controls height="100%">
              Sorry, your browser doesn't support embedded videos.
            </video>
            <br/>
            <marquee  behavior="scroll" direction="right">  
              <img id="car" src={'/assets/car.png'} width='200px'></img>
            </marquee>
            <br/>
            <img id="img" src="/assets/startpicture.jpg" width='200px'  style={{'position': 'absolute', 'left': '0px', 'right' : '550px'}}/>
            <div id="title" style={{'position': 'absolute', 'left': '0px', 'backgroundColor': 'white'}}>IIIT Hyderabad</div>
          </div>
        </>
      );
}
