import { Link } from 'react-router-dom';
import axios from 'axios';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useState } from "react";

function Home() {

  let [respText, getText] = useState('');
  let [songs, getSongs] = useState([]);
  let [status, setStatus] = useState(false);

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
      query: respText,
      running: status,
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

  let accident = async () => {
    await axios.post('http://127.0.0.1:5000/accident', { airbags: true, })
      .then(function (response) {
        getText(response.data);
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
    // backgroundColor:
    borderRadius: "45%",
    height: "85px",
    width: "85px",
    position: "absolute",
    top: "374px",
    left: "790px",
    fontSize: "24px"
  };

  const btn4 = {
    // backgroundColor:
    borderRadius: "45%",
    height: "85px",
    width: "85px",
    position: "absolute",
    top: "74px",
    left: "20px",
    fontSize: "24px"
  };


  return (

    <div style={myStyle}>
      <Link to='/movie'> <button style={btn}> click!</button></Link>
      <button onClick={() => { SpeechRecognition.startListening({ language: 'hi-IN' }); }} style={btn1}>Start</button>
      <button onClick={(event) => { SpeechRecognition.stopListening(); apicall(); getText(transcript); }} style={btn2}>Stop</button>
      <p>{transcript}</p>
      <button onClick={accident} style={btn3}> bags </button>
      <button onClick={updateStatus} style={btn4}>
        {
          status == false ? <p>Start Car</p> : <p>Stop Car</p>
        }

      </button>
      {/* <audio controls autoplay>
        <source src="https://p.scdn.co/mp3-preview/259d67fae14c258c49add59b2b5e721c335edb90?cid=37f5cdbd24004b1db95e46a7a37b9d8e" type="audio/ogg">
    </audio> */}
    </div>

  );
}

export default Home;