var recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = "hi-IN";

var listening = false;
var interim_transcript = '';
var final_transcript = '';
var songs;

recognition.onresult = function(event) {
    

    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        final_transcript += event.results[i][0].transcript;
        document.getElementById('transcript').value = final_transcript;
        record();
      } else {
        interim_transcript += event.results[i][0].transcript;
            document.getElementById('transcript').value = interim_transcript;
      }
    }
    console.log(final_transcript);
    apicall();
    final_transcript = '';
};

function record() { 

  // setTimeout(recognition,5000);

  if(listening) {
    recognition.stop();  
    listening = false;
    document.getElementById('action').value = "Start";
  }
  else {
    recognition.start();
    listening = true;
    document.getElementById('action').value = "Stop";
  }
}

function apicall() {
    // console.log("came here");
    axios.post('http://127.0.0.1:5000/vc', {
        query : final_transcript,
      })
      .then(function (response) {
        songs = response.data.result;
        console.log(songs);
      })
      .catch(function (error) {
        console.log(error);
      });
}

function accident() {
  axios.post('http://127.0.0.1:5000/accident', {"airbags":false})
  .then(function (response) {
    
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}