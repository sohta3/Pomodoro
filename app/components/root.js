import React, { PropTypes } from 'react'
import { connect } from 'react-redux';
import { setPomodoroLength, setBreakLength, setActivityType,
    startTimer, tickTimer, pauseTimer, clearTimer, finishTimer
} from '../actions'
import Controls from '../components/controls'
import Clock from '../components/clock'

import {
    View,
    Text,
    StyleSheet
} from 'react-native'


class Root extends React.Component {

    constructor (props) {
        super(props)
        this.ONE_SEC = 1000
        this.counter
        this.timeout

        this.stopTimeout = this.stopTimeout.bind(this)

        //this.tickSound = new Audio('https://cdn.rawgit.com/Cu7ious/React-n-Redux-Pomodoro-Clock/0697fb10e56f3cb79a13e7063aa400010d43adf8/assets/sounds/Tick-tock-sound.mp3') // 00:26
        //this.alarmSound = new Audio('https://cdn.rawgit.com/Cu7ious/React-n-Redux-Pomodoro-Clock/0697fb10e56f3cb79a13e7063aa400010d43adf8/assets/sounds/Alarm-clock-sound-short.mp3') // 00:02
        //this.tickSound.addEventListener('ended', function() {
        //    this.currentTime = 0
        //    this.play()
        //}, false);
    }

    stopTimeout () {
        clearTimeout(this.timeout)
    }

    componentDidUpdate () {
        const t = this
        const p = this.props
        const timer = this.props.timer
        const length = (p.activity_type == "p") ? p.breakLength : p.pomodoroLength

        const startTimeout = () => {
            t.timeout = setTimeout(() => {
                t.counter = t.counter - t.ONE_SEC
                if (t.counter === 0) {
                    let type = (p.activity_type == "p") ? "b" : "p"
                    p.finishTimer()
                    p.setActivityType(type)
                    //t.tickSound.pause()
                    //t.tickSound.currentTime = 0
                    //t.alarmSound.play()
                } else {
                    p.tickTimer(t.counter)
                }
            }, t.ONE_SEC)
        }

        if (p.timer.is_finished) {
            p.clearTimer()
            setTimeout(() => {
                t.tickSound.play()
                p.startTimer(length)
            }, t.ONE_SEC)
        }

        if (timer.is_active) {
            let length = (p.activity_type == "p") ? p.pomodoroLength : p.breakLength
            this.counter = (timer.time == 0) ? length : timer.time
            if (this.counter !== 0) {
                startTimeout()
            }
        }
    }

    render () {
        let p = this.props
        let humanTime = (p.activity_type == "b") ? p.breakLength : p.pomodoroLength
        return (
            <View style={styles.container}>
                <Controls
                    timer={p.timer}
                    pomodoroLength={p.pomodoroLength}
                    breakLength={p.breakLength}
                    activityType={p.activity_type}
                    stopTimeout={this.stopTimeout}
                    acts={{
                        setActivityType: p.setActivityType,
                            setBreakLength: p.setBreakLength,
                            setPomodoroLength: p.setPomodoroLength,
                            startTimer: p.startTimer,
                            pauseTimer: p.pauseTimer,
                            clearTimer: p.clearTimer
                    }}
                    sounds={{
                        tick: this.tickSound,
                            alarm: this.alarmSound
                    }}
                />
                <Clock timer={p.timer} type={p.activity_type} act={p.setActivityType}>
                    {humanTime}
                </Clock>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
export default Root
