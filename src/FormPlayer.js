import Button from "react-bootstrap/Button";
import React from 'react'
import {Col, ProgressBar, Row} from "react-bootstrap";


const synth = window.speechSynthesis;
const delay = ms => new Promise((res) => {
    console.log("Waiting " + ms)
    return setTimeout(res, ms)
});
const COLOR_MAP = {
    "red": "danger",
    "yellow": "warning",
    "blue": "primary",
    "green": "success"
}

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
        await this.requestWakeLock()
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
        await delay(1000 * this.props.secondsBetweenSteps)
        await this.speak("Burrow, show.")
        await this.speak("End of " + this.props.name)
        this.setState(prevState => ({isPlaying: false}));


    }

    async requestWakeLock() {
        try {
            this.wakeLock = await navigator.wakeLock.request('screen');
            console.log("Successfully requested wake lock");
        } catch (err) {
            // the wake lock request fails - usually system related, such being low on battery
            console.log(`${err.name}, ${err.message}`);
        }
    }

    releaseWakeLock() {
        if (this.wakeLock) {
            try {
                console.log("Releasing wake lock");
                this.wakeLock.release()
                this.wakeLock = undefined
            } catch (err) {
                // the wake lock request fails - usually system related, such being low on battery
                console.log(`${err.name}, ${err.message}`);
            }
        }
    }

    stop() {
        this.releaseWakeLock()
        this.setState(prevState => ({
            isPlaying: false
        }));
        synth.cancel()
    }

    speak = async (text) => {
        return new Promise((resolve, reject) => {
            let utterThis = new SpeechSynthesisUtterance();
            const selectedVoice = this.props.voice

            utterThis.text = text
            utterThis.voice = speechSynthesis.getVoices().filter(function(voice) {
                return voice.voiceURI === selectedVoice;
            })[0]
            utterThis.rate = this.props.speed / 100
            synth.speak(utterThis);
            utterThis.onend = resolve;
        });
    };

    render() {
        const isPlaying = this.state.isPlaying;
        const max = this.props.steps.length;
        const current = this.state.currentStep + 1;
        const colorClass = COLOR_MAP[this.props.color]
        if (isPlaying) {
            return (
                <Row>
                    <Col sm={10} className="d-flex align-items-center p-3">
                        <ProgressBar className="w-100 h-100" striped animated variant="primary" max={max} now={current} label={`${current} / ${max}`} />
                    </Col>
                    <Col sm={2} className="p-3">
                        <Button as="button" size="lg" variant="danger" className="w-100" onClick={this.stop}>
                            Stop
                        </Button>
                    </Col>
                </Row>
            );
        } else {
            return (
                <Row className="p-3">
                    <Button as="button" variant={colorClass} size="lg" onClick={this.play}>
                        {this.name}
                    </Button>
                </Row>
            );
        }

    }
}

export default FormPlayer;
