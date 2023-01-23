import Button from "react-bootstrap/Button";
import React from 'react'
import {Col, ProgressBar, Row} from "react-bootstrap";


const synth = window.speechSynthesis;
const delay = ms => new Promise((res) => {
    console.log("Waiting " + ms)
    return setTimeout(res, ms)
});


class FormPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.name = props.name
        this.state = {
            isPlaying: false,
            currentStep: 0
        };

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
        while (this.state.isPlaying && this.state.currentStep < this.props.steps.length - 1) {
            await delay(1000 * this.props.secondsBetweenSteps)
            console.log("Playing step " + this.state.currentStep)
            console.log("Seconds between steps " + this.props.secondsBetweenSteps)
            await this.speak(this.props.steps[this.state.currentStep])
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
        const max = this.props.steps.length;
        const current = this.state.currentStep + 1;
        if (isPlaying) {
            return (
                <Row className="mt-3">
                    <Col sm={10} className="d-flex align-items-center">
                        <ProgressBar className="w-100 h-100" striped animated variant="success" max={max} now={current} label={`${current} / ${max}`} />
                    </Col>
                    <Col sm={2}>
                        <Button as="button" size="lg" variant="danger" className="w-100 p-3" onClick={this.stop}>
                            Stop
                        </Button>
                    </Col>
                </Row>
            );
        } else {
            return (
                <Row className="mt-3">
                    <Button as="button" variant="success" size="lg" onClick={this.play}>
                        Start {this.name}
                    </Button>
                </Row>
            );
        }

    }
}

export default FormPlayer;
