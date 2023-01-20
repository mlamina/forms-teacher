import "./App.css"
import {useEffect, useState} from "react"
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import {Col, Form, Row} from "react-bootstrap";


const MAX_SECONDS_BETWEEN_STEPS = 10;
const synth = window.speechSynthesis;

const delay = ms => new Promise((res) => {
    console.log("Waiting " + ms)
    return setTimeout(res, ms)
});

class FormPlayer {

    constructor() {
        this.isPlaying = false
        this.dictationSpeed = 1
        this.timeBetweenSteps = 1
        this.currentStep = 0
    }

    async play(form) {
        this.currentStep = 0
        await this.speak("Basic Form. Ready, begin.")
        while (this.currentStep < form.length) {
            await delay(1000 * this.timeBetweenSteps)
            console.log("Playing step " + this.currentStep)
            await this.speak(form[this.currentStep])
            this.currentStep = this.currentStep + 1
        }
        console.log("Done!")
    }

    stop() {
        console.log("Stopping")
        this.isPlaying = false
        this.currentStep = 0
        synth.cancel()
    }

    speak = async (text) => {
        return new Promise((resolve, reject) => {
            let utterThis = new SpeechSynthesisUtterance();
            utterThis.text = text
            utterThis.rate = this.dictationSpeed
            synth.speak(utterThis);
            utterThis.onend = resolve;
        });
    };
}

let formPlayer = new FormPlayer()

function App() {

    const [isPlaying, setIsPlaying] = useState(false);
    const [buttonText, setButtonText] = useState("Basic Form");
    const [timeBetweenSteps, setTimeBetweenSteps] = useState(5);
    const [dictationSpeed, setDictationSpeed] = useState(1);


    const changeDictationSpeed = (event) => {
        setDictationSpeed(event.target.value);
        formPlayer.dictationSpeed = event.target.value / 100
    }

    const changeTimeBetweenSteps = (event) => {
        const newTime = Math.round((event.target.value / 100) * MAX_SECONDS_BETWEEN_STEPS)
        setTimeBetweenSteps(newTime);
        formPlayer.timeBetweenSteps = newTime
    }

    const basicForm = ["Shift the balance to the right foot, pivot ninety degrees to the left, assume a front stance and down block.",
    "Step forward to a front stance, single middle punch.",
    "Shift the balance to the left foot, pivot one-hundred eighty degrees to the right, assume a front stance and down block."]


    useEffect(() => {
        if (isPlaying) {
            formPlayer.play(basicForm)
            setButtonText("STOP")
        } else {
            formPlayer.stop()
            setButtonText("Basic Form")
        }
    }, [isPlaying]);

    const ClickHandler = () => {
        setIsPlaying(!isPlaying)
    };

  return (

      <div className='App'>
          <Navbar bg="light" expand="lg">
              <Container>
                  <Navbar.Brand href="#home">Forms Teacher</Navbar.Brand>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">

                  </Navbar.Collapse>
              </Container>
          </Navbar>
          <Container>
              <Row>
                    <Col>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Dictation Speed: {dictationSpeed}</Form.Label>
                                <Form.Range onChange={changeDictationSpeed}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Wait {timeBetweenSteps} seconds between two steps</Form.Label>
                                <Form.Range onChange={changeTimeBetweenSteps} />
                            </Form.Group>
                            <Button as="button" variant="primary" onClick={ClickHandler}>
                                {buttonText}
                            </Button>
                        </Form>
                    </Col>
              </Row>


          </Container>
      </div>
  )
}

export default App;
