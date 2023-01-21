import "./App.css"
import {useState} from "react"
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import {Col, Form, Nav, Row} from "react-bootstrap";
import FormPlayer from "./FormPlayer";


const MAX_SECONDS_BETWEEN_STEPS = 10;

function App() {

    const [timeBetweenSteps, setTimeBetweenSteps] = useState(5);
    const [dictationSpeed, setDictationSpeed] = useState(1);


    const changeDictationSpeed = (event) => {
        setDictationSpeed(event.target.value);
    }

    const changeTimeBetweenSteps = (event) => {
        const newTime = Math.round((event.target.value / 100) * MAX_SECONDS_BETWEEN_STEPS)
        setTimeBetweenSteps(newTime);
    }

    return (

        <div className='App'>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">Forms Teacher</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container>
                <Form>
                    <Form.Group  as={Row} className="mb-3" controlId="settingsForm.DictationSpeed">
                        <Form.Label column sm={2}>Dictation Speed: {dictationSpeed}</Form.Label>
                        <Col sm={10}>
                            <Form.Range onChange={changeDictationSpeed}/>
                        </Col>

                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="settingsForm.TimeBetweenSteps">
                        <Form.Label column sm={2}>Wait {timeBetweenSteps} seconds between two steps</Form.Label>
                        <Col sm={10}>
                            <Form.Range onChange={changeTimeBetweenSteps} />
                        </Col>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="settingsForm.Forms">
                        <FormPlayer name="Basic Form" speed={dictationSpeed} secondsBetweenSteps={timeBetweenSteps}/>
                    </Form.Group>

                </Form>

            </Container>
        </div>
    )
}

export default App;
