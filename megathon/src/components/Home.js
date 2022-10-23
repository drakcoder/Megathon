import { Link } from 'react-router-dom';
import axios from 'axios';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useState } from "react";

function Home() {

    let [respText, getText] = useState('');
    let [songs, getSongs] = useState([]);

    // var recognition = new webkitSpeechRecognition();
    // recognition.continuous = true;
    // recognition.interimResults = true;
    // recognition.lang = "hi-IN";

    // var listening = false;
    // var interim_transcript = '';
    // var final_transcript = '';
    // var songs;
    // var bags = true;
    // var respText = '';

    const {
        transcript,
        listening,
        browserSupportsSpeechRecognition,
    } = useSpeechRecognition();
    
    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }
    
    

    function apicall() {
        console.log("came here");
        axios.post('https://3bf2-14-139-82-6.in.ngrok.io/vc', {
            query : respText,
          })
          .then(function (response) {
            getSongs(response.data.resut);
            // songs = response.data.result;
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
    }


    const myStyle={
        backgroundImage: "url('https://wallpaperaccess.com/full/5552439.jpg')",
        height:'110vh',
        fontSize:'50px',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    };

    
    const btn = {borderRadius: "45%",
    height: "85px",
    width: "85px",
    position: "absolute",
    top: "175px",
    left: "195px",
    fontSize: "24px"}

    const btn1 = {borderRadius: "45%",
    height: "85px",
    width: "85px",
    position: "absolute",
    top: "175px",
    left: "326px",
    fontSize: "24px"}

    
    const btn2 = {borderRadius: "45%",
    height: "85px",
    width: "85px",
    position: "absolute",
    top: "174px",
    left: "465px",
    fontSize: "24px"}

    const btn3 = {
        borderRadius: "45%",

    }


    return (

        <div style={myStyle}>
            <Link to='/movie'> <button style={btn}> click!</button></Link> 
            <button onClick={() => {SpeechRecognition.startListening({ language: 'hi-IN' })}} style={btn1}>Start</button>
            <button onClick={(event)=>{SpeechRecognition.stopListening(); apicall()}} style={btn2}>Stop</button>
            <p>{transcript}</p>
            <button onClick={accident} style={btn3}> bags </button>
            {/* <audio controls autoplay>
        <source src="https://p.scdn.co/mp3-preview/259d67fae14c258c49add59b2b5e721c335edb90?cid=37f5cdbd24004b1db95e46a7a37b9d8e" type="audio/ogg">
    </audio> */}
        </div>

    );
}

export default Home;