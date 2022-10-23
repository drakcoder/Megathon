import { Link, Navigate ,useHistory, useNavigate} from 'react-router-dom';
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
                if(commandData.command=="movie"){
                    Navigate("./movie");
                }
                else{
                    Navigate("./map?type=" + commandData.command);
                }
            }
        });
      }, []);

    
    let [url, seturl] = useState("https://p.scdn.co/mp3-preview/8c5b82cb04077bda1f8642bff93e4ea6a1aaf038?cid=1bbc26bf3d92460ba5dec599b34cf3ab");
    const [playing, toggle] = useAudio(url);
    let [respText, getText] = useState('');
    let [songs, getSongs] = useState([]);
    let [status, setStatus]=useState(false);
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
            query : respText,
            running : status,
          })
          .then(function (response) {
            getSongs(response.data.resut);
            // songs = response.data.result;
            if(Array.isArray(songs.result)){
                seturl(songs.result[0].song_url);
                toggle();
            }
            else{
                setDoor(songs.result);
            }
            console.log(songs);
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    let accident=async()=>{
        await axios.post('http://127.0.0.1:5000/accident', {airbags:true,})
        .then(function (response) {
          getText(response.data);
        //   respText = response.data;
        console.log(respText);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

    const myStyle={
        backgroundImage: "url('https://wallpaperaccess.com/full/5552439.jpg')",
        height:'110vh',
        fontSize:'50px',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    };
    
  const btn = {
    borderRadius: "45%",
    height: "85px",
    width: "85px",
    position: "absolute",
    top: "175px",
    left: "195px",
    fontSize: "24px"
  };

  const btn1 = {
    borderRadius: "45%",
    height: "85px",
    width: "85px",
    position: "absolute",
    top: "175px",
    left: "326px",
    fontSize: "24px"
  };


  const btn2 = {
    borderRadius: "45%",
    height: "85px",
    width: "85px",
    position: "absolute",
    top: "174px",
    left: "465px",
    fontSize: "24px"
  };

  const btn3 = {
    borderRadius: "45%",
    height: "85px",
    width: "85px",
    position: "absolute",
    top: "375px",
    left: "800px",
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
        top: "500px",
        left: "200px",
        fontSize: "24px"
    }

    const btn6 = {
        borderRadius: "45%",
        height: "45px",
        width: "85px",
        position: "absolute",
        top: "500px",
        left: "500px",
        fontSize: "24px"
    }


    return (

        <div style={myStyle}>
            <Link to='/movie'> <button style={btn}> click!</button></Link> 
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
            <button onClick={() => {SpeechRecognition.startListening({ language: 'hi-IN' })}} style={btn1}>Start</button>
            <button onClick={(event)=>{SpeechRecognition.stopListening(); apicall()}} style={btn2}>Stop</button>
            {/* <p>{transcript}</p> */}
            <button onClick={accident} style={btn3}> bags </button>
            <button onClick={updateStatus} style={btn4}>
                {
                    status == false ? <p>Start Car</p> : <p>Stop Car</p>
                }
            </button> 
            <button onClick={toggle} style={btn5}>{playing ? "Pause" : "Play"}</button>
            <Link to='/map?type=catering'><button style={btn6}>Map</button></Link>
        </div>

  );
}


export default Home;