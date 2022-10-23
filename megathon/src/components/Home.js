import { Link, Navigate, useHistory, useNavigate } from 'react-router-dom';
import alanBtn from '@alan-ai/alan-sdk-web';
import React from 'react';
import axios from 'axios';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useState, useEffect } from "react";

const useAudio = url => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  },
    [playing]
  );

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, []);

  return [playing, toggle];
};

function Home() {

  const Navigate = useNavigate();
  useEffect(() => {
    alanBtn({
      key: '5ceaf8fe35fd40b06c993ec658bc8c6d2e956eca572e1d8b807a3e2338fdd0dc/stage',
      onCommand: (commandData) => {
        if (commandData.command == "movie") {
          Navigate("./movie");
        }
        else {
          Navigate("./map?type=" + commandData.command);
        }
      }
    });
  }, []);


  const [url, seturl] = useState('https://p.scdn.co/mp3-preview/8c5b82cb04077bda1f8642bff93e4ea6a1aaf038?cid=1bbc26bf3d92460ba5dec599b34cf3ab');
  const [playing, toggle] = useAudio(url);
  let [respText, getText] = useState('');
  let [songs, getSongs] = useState([]);
  let [status, setStatus] = useState(false);
  let [door, setDoor] = useState('');

  const {
    transcript,
    listening,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }


  function updateStatus() {
    if (status == true) {
      setStatus(false);
    }
    else {
      setStatus(true);
    }
  }


  function apicall() {
    console.log("came here");
    getText(transcript);
    axios.post('http://127.0.0.1:5000/vc', {
      query: transcript,
      running: status,
    })
      .then(function (response) {
        console.log(response);
        getSongs(response.data.result);
        // songs = response.data.result;
        if (Array.isArray(response.data.result)) {
          seturl(response.data.result[0].song_url);
          console.log(url);
          toggle();
        }
        else {
          setDoor(songs.result);
        }
        console.log(songs);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  let accident = async () => {
    await axios.post('http://127.0.0.1:5000/accident', { airbags: true, })
      .then(function (response) {
        getText(response.data.message);
        //   respText = response.data;
        console.log(respText);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const myStyle = {
    backgroundImage: "url('https://wallpaperaccess.com/full/5552439.jpg')",
    height: '110vh',
    fontSize: '50px',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  };

  const btn = {
    borderRadius: "45%",
    height: "85px",
    width: "85px",
    position: "absolute",
    top: "255px",
    left: "305px",
    fontSize: "24px"
  };

  const btn1 = {
    borderRadius: "45%",
    height: "85px",
    width: "85px",
    position: "absolute",
    top: "255px",
    left: "500px",
    fontSize: "24px"
  };


  const btn2 = {
    borderRadius: "45%",
    height: "85px",
    width: "85px",
    position: "absolute",
    top: "255px",
    left: "700px",
    fontSize: "24px"
  };

  const btn3 = {
    borderRadius: "45%",
    height: "85px",
    width: "85px",
    position: "absolute",
    top: "500px",
    left: "1150px",
    fontSize: "24px"
  };
  const btn4 = {
    borderRadius: "45%",
    height: "85px",
    width: "85px",
    position: "absolute",
    top: "100px",
    left: "70px",
    fontSize: "24px"
  };


  const btn5 = {
    borderRadius: "45%",
    height: "45px",
    width: "85px",
    position: "absolute",
    top: "600px",
    left: "400px",
    fontSize: "24px"
  };

  const btn6 = {
    borderRadius: "45%",
    height: "45px",
    width: "85px",
    position: "absolute",
    top: "600px",
    left: "600px",
    fontSize: "24px"
  };


  return (

    <div style={myStyle}>
      <a href='http://localhost:5000/video' target="_blank"><button style={btn}>
        <i class="fa-solid fa-video fa-lg"></i>
      </button></a>
      <div className='bg-secondary'>
        {
          respText
        }
      </div>
      <div className='bg-secondary'>
        {
          door
        }
      </div>
      <button onClick={() => { SpeechRecognition.startListening({ language: 'hi-IN' }); }} style={btn1}>
        <i class="fa-solid fa-microphone fa-lg"></i>
      </button>
      <button onClick={(event) => { SpeechRecognition.stopListening(); apicall(); }} style={btn2}>
        <i class="fa-solid fa-microphone-slash fa-lg"></i>
      </button>
      {/* <p>{transcript}</p> */}
      <button backgroundImage="https://static.thenounproject.com/png/880451-200.png" onClick={accident} style={btn3}> <i class="fa-solid fa-user-shield fa-"></i> </button>
      <button onClick={updateStatus} style={btn4}>
        {
          status == false ? <p><i class="fa-solid fa-power-off text-success mt-4"></i></p> : <p> <i class="fa-solid fa-power-off text-danger mt-4"></i> </p>
        }
      </button>
      <button onClick={toggle} style={btn5}>{playing ? <i class="fa-solid fa-pause"></i> : <i class="fa-solid fa-play"></i>}</button>
      <Link to='/map?type=catering'><button style={btn6}><i class="fa-solid fa-map-location-dot"></i></button></Link>
    </div>

  );
}


export default Home;