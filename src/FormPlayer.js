import Button from "react-bootstrap/Button";
import React from 'react'
import {Col, ProgressBar, Row} from "react-bootstrap";


const synth = window.speechSynthesis;
const delay = ms => new Promise((res) => {
    console.log("Waiting " + ms)
    return setTimeout(res, ms)
});

const basicForm = [
    "Shift the balance to the right foot, pivot ninety degrees to the left, assume a front stance and down block.",
    "Step forward to a front stance, single middle punch.",
    "Shift the balance to the left foot, pivot one-hundred eighty degrees to the right, assume a front stance and down block.",
    "Step forward to a front stance, single middle punch.",
    "Shift the balance to the right foot, pivot ninety (90) degrees to the left, assume a front stance and down block.",
    "Step forward, front stance and (inside) middle block.",
    "Step forward, front stance and (inside) middle block.",
    "Step forward, front stance, middle punch and kihap.",
    "Shift the balance to the right foot, pivot two-hundred seventy (270) degrees to the left, assume a front stance and rising block.",
    "Step forward to a front stance, single middle punch.",
    "Shift the balance to the left foot, pivot one-hundred eighty (180) degrees to the right, assume a front stance and rising block.",
    "Step forward to a front stance, single middle punch.",
    "Shift the balance to the right foot, pivot ninety (90) degrees to the left, assume a front stance and down block.",
    "Front kick, step forward front stance and middle punch.",
    "Front kick, step forward front stance and middle punch.",
    "Front kick, step forward front stance, middle punch and kihap.",
    "Shift the balance to the right foot, pivot two-hundred seventy (270) degrees to the left, assume a front stance and down block.",
    "Step forward, front stance and middle punch.",
    "Shift the balance to the left foot, pivot one-hundred eighty (180) degrees to the right, assume a front stance and down block.",
    "Step forward, front stance and middle punch.",
]

class FormPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.name = props.name
        this.state = {
            isPlaying: false,
            currentStep: 0
        };
        // TODO Load form dynamically based on component property
        this.form = basicForm

        // This binding is necessary to make `this` work in the callback
        this.play = this.play.bind(this);
        this.stop = this.stop.bind(this);
    }

    async play() {
        this.setState(prevState => ({
            isPlaying: true,
            currentStep: 0
        }));
        await this.speak(this.props.name + ". Ready, begin.")
        while (this.state.isPlaying && this.state.currentStep < this.form.length - 1) {
            await delay(1000 * this.props.secondsBetweenSteps)
            console.log("Playing step " + this.state.currentStep)
            console.log("Seconds between steps " + this.props.secondsBetweenSteps)
            await this.speak(this.form[this.state.currentStep])
            this.setState(prevState => ({
                currentStep: prevState.currentStep + 1,
            }));
        }
        this.setState(prevState => ({isPlaying: false}));
        console.log("Done!")
    }

    stop() {
        console.log("Stopping")
        this.setState(prevState => ({
            isPlaying: false
        }));
        synth.cancel()
    }

    speak = async (text) => {
        return new Promise((resolve, reject) => {
            let utterThis = new SpeechSynthesisUtterance();
            utterThis.text = text
            utterThis.rate = this.props.speed / 100
            synth.speak(utterThis);
            utterThis.onend = resolve;
        });
    };

    render() {
        const isPlaying = this.state.isPlaying;
        const max = this.form.length;
        const current = this.state.currentStep + 1;
        if (isPlaying) {
            return (
                <Row>
                    <Col sm={10}>
                        <ProgressBar className="align-middle" striped animated variant="success" max={max} now={current} label={`${current} / ${max}`} />
                    </Col>
                    <Col sm={2}>
                        <Button as="button" size="lg" variant="danger" onClick={this.stop}>
                            Stop
                        </Button>
                    </Col>
                </Row>
            );
        } else {
            return (
                <Button as="button" variant="success" size="lg" onClick={this.play}>
                    Start {this.name}
                </Button>
            );
        }

    }
}

export default FormPlayer;
