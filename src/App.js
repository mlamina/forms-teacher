import "./App.css"
import {useState} from "react"

function App() {

    let playing = false;
    const [buttonText, setButtonText] = useState("Basic Form");
    const synth = window.speechSynthesis;

    const speak = (text) => {
        const msg = new SpeechSynthesisUtterance()
        msg.text = text
        msg.rate = 0.9
        synth.speak(msg);
    };


    const basicForm = ["Shift the balance to the right foot, pivot ninety degrees to the left, assume a front stance and down block.",
    "Step forward to a front stance, single middle punch.",
    "Shift the balance to the left foot, pivot one-hundred eighty degrees to the right, assume a front stance and down block."]
    const delay = ms => new Promise(res => setTimeout(res, ms));

    const speakForm = async (form) => {
        speak("Basic Form. Ready, begin.")
        for (let step in form) {
            if (!playing) break;
            speak(form[step])
            delay(1000)
        }
    }
    const handleClick = () => {
        if (playing) {
            console.log("Stopping")
            setButtonText("Basic Form")
            playing = false
            synth.cancel()
        } else {
            console.log("Starting")
            setButtonText("STOP")
            playing = true
            speakForm(basicForm)
        }
    };

  return (
      <div className='App'>
        <h1>Forms Teacher</h1>
          <div>
              <button type="button" onClick={handleClick}>{buttonText}</button>
          </div>
      </div>
  )
}

export default App;
