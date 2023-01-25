import "./App.css"
import {useState} from "react"
import Container from 'react-bootstrap/Container';
import logo from './logo.png'
import {Col, Form, Row} from "react-bootstrap";
import FormPlayer from "./FormPlayer";

const FORMS = [
    require('./forms/basic_form.json'),
    require('./forms/gravity.json'),
    require('./forms/terramoto.json'),
    require('./forms/riverbed.json'),
    require('./forms/attitude.json'),
    require('./forms/waterfall.json'),
    require('./forms/spirit.json'),
    require('./forms/walk_in_the_park.json'),
    require('./forms/quetzalcoatl.json'),
    require('./forms/alignment.json')
]

const MAX_SECONDS_BETWEEN_STEPS = 10;
const canWakeLock = 'wakeLock' in navigator;

function App() {

    const [timeBetweenSteps, setTimeBetweenSteps] = useState(2);
    const [dictationSpeed, setDictationSpeed] = useState(100);
    const [voice, setVoice] = useState("");

    window.speechSynthesis.onvoiceschanged = function(e) {
        setVoice(window.speechSynthesis.getVoices()[0].voiceURI)
    };


    const changeDictationSpeed = (event) => {
        setDictationSpeed(event.target.value);
    }

    const changeVoice = (event) => {
        setVoice(event.target.value);
    }

    const changeTimeBetweenSteps = (event) => {
        const newTime = Math.round((event.target.value / 100) * MAX_SECONDS_BETWEEN_STEPS)
        setTimeBetweenSteps(newTime);
    }

    const formButtons = []
    for (let i = 0; i < FORMS.length; i++) {
        formButtons.push(<FormPlayer voice={voice}
                                     key={FORMS[i].name}
                                     as={Row}
                                     name={FORMS[i].name}
                                     color={FORMS[i].color}
                                     steps={FORMS[i].steps}
                                     speed={dictationSpeed} secondsBetweenSteps={timeBetweenSteps}/>);
    }
    const voices = window.speechSynthesis.getVoices()
    const voiceOptions = []

    for (let i = 0; i < voices.length; i++) {
        voiceOptions.push(<option value={voices[i].voiceURI} key={voices[i].voiceURI}>{voices[i].name}</option>);
    }

    let message = "Put your headphones in and select a form!"
    if (!canWakeLock) {
        message = "The app will stop working if your screen turns off, make sure to disable your phone's auto-lock feature."
    }

    return (

        <div className='App'>
            <nav className="navbar navbar-default" role="navigation">
                <div className="navbar-header">
                    <span className="navbar-brand">
                        <img src={logo} width="30" height="30" className="d-inline-block align-top" alt=""/>
                        Quantum Forms Reader
                    </span>
                </div>
            </nav>

            <Container>
                <Form>
                    <Row className="p-3 border border-secondary rounded rounded-3 bg-secondary text-white flex align-content-center">
                        <Col>{message}</Col>

                    </Row>
                    <Form.Group as={Row} className="p-3" controlId="settingsForm.DictationSpeed">
                        <Form.Label column sm={2}>Voice</Form.Label>
                        <Col sm={10} className="d-flex align-items-center">
                            <Form.Select aria-label="Select a voice" onChange={changeVoice}>
                                {voiceOptions}
                            </Form.Select>
                        </Col>

                    </Form.Group>
                    <Form.Group  as={Row} className="p-3" controlId="settingsForm.DictationSpeed">
                        <Form.Label column sm={2}>Dictation Speed</Form.Label>
                        <Col sm={10} className="d-flex align-items-center">
                            <Form.Range className="w-100 h-100 custom-range" onChange={changeDictationSpeed}/>
                        </Col>

                    </Form.Group>

                    <Form.Group as={Row} className="p-3" controlId="settingsForm.TimeBetweenSteps">
                        <Form.Label column sm={2}>{timeBetweenSteps} seconds between steps</Form.Label>
                        <Col sm={10} className="d-flex align-items-center">
                            <Form.Range onChange={changeTimeBetweenSteps} className="w-100 h-100 custom-range" />
                        </Col>
                    </Form.Group >
                    {formButtons}
                    <Row className="p-3 text-secondary">
                        Wakelock supported: {canWakeLock ? "Yes" : "No"}
                    </Row>
                </Form>

            </Container>
        </div>
    )
}

export default App;
