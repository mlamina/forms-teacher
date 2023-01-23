import "./App.css"
import {useState} from "react"
import Container from 'react-bootstrap/Container';
import logo from './logo.png'
import {Col, Form, Nav, Row} from "react-bootstrap";
import FormPlayer from "./FormPlayer";

const FORMS = [
    require('./forms/basic_form.json'),
    require('./forms/gravity.json')
]

const MAX_SECONDS_BETWEEN_STEPS = 10;

function App() {

    const [timeBetweenSteps, setTimeBetweenSteps] = useState(2);
    const [dictationSpeed, setDictationSpeed] = useState(95);


    const changeDictationSpeed = (event) => {
        setDictationSpeed(event.target.value);
    }

    const changeTimeBetweenSteps = (event) => {
        const newTime = Math.round((event.target.value / 100) * MAX_SECONDS_BETWEEN_STEPS)
        setTimeBetweenSteps(newTime);
    }

    const formButtons = [];
    for (let i = 0; i < FORMS.length; i++) {
        formButtons.push(<FormPlayer key={FORMS[i].name} as={Row} name={FORMS[i].name} steps={FORMS[i].steps} speed={dictationSpeed} secondsBetweenSteps={timeBetweenSteps}/>);
    }

    return (

        <div className='App'>
            <nav className="navbar navbar-default" role="navigation">
                <div className="navbar-header">
                    <a className="navbar-brand" href="#">
                        <img src={logo} width="30" height="30" className="d-inline-block align-top" alt=""/>
                        Quantum Forms Reader
                    </a>
                </div>
            </nav>
            <Container className="p-3 mb-2 border border-secondary rounded rounded-3  bg-secondary text-white">

                Put your headphones in and make sure to not turn off your phone's screen!
            </Container>
            <Container>
                <Form>
                    <Form.Group  as={Row} className="p-3" controlId="settingsForm.DictationSpeed">
                        <Form.Label column sm={2}>Dictation Speed: {dictationSpeed}</Form.Label>
                        <Col sm={10} className="d-flex align-items-center">
                            <Form.Range className="w-100 h-100 custom-range" onChange={changeDictationSpeed}/>
                        </Col>

                    </Form.Group>

                    <Form.Group as={Row} className="p-3" controlId="settingsForm.TimeBetweenSteps">
                        <Form.Label column sm={2}>{timeBetweenSteps} seconds between steps</Form.Label>
                        <Col sm={10} className="d-flex align-items-center">
                            <Form.Range onChange={changeTimeBetweenSteps} className=" w-100 h-100 custom-range" />
                        </Col>
                    </Form.Group >
                    {formButtons}
                    <Form.Group as={Row} className="mb-3" controlId="settingsForm.Forms">

                    </Form.Group>

                </Form>

            </Container>
        </div>
    )
}

export default App;
