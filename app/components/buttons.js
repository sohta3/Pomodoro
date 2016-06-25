import React, { PropTypes } from 'react'

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native'


class Buttons extends React.Component {

    constructor () {
        super()
        this._startTimer = this._startTimer.bind(this)
        this._pauseTimer = this._pauseTimer.bind(this)
        this._clearTimer = this._clearTimer.bind(this)
    }

    _startTimer () {
        let p = this.props
        let activityType = p.activityType
        let time
        activityType = (activityType == "p") ? p.pomodoroLength : p.breakLength
        time = p.timer.time || activityType
        p.acts.startTimer(time)
        p.sounds.tick.setNumberOfLoops(-1)
        p.sounds.tick.play()
    }

    _pauseTimer () {
        let p = this.props
        let activityType = p.activityType
        let time
        activityType = (activityType == "p") ? p.pomodoroLength : p.breakLength
        time = p.timer.time || activityType
        p.stopTimeout()
        p.acts.pauseTimer(time)
        p.sounds.tick.pause()
    }

    _clearTimer () {
        let p = this.props
        p.stopTimeout()
        p.acts.clearTimer()
        p.sounds.tick.pause()
        p.sounds.alarm.pause()
        p.sounds.tick.setCurrentTime(0)
        p.sounds.alarm.setCurrentTime(0)
    }

    render () {
        let p = this.props
        // console.log(p);
        let callback = p.disabled ? this._pauseTimer : this._startTimer
        let text = p.disabled ? "Pause" : "Start"

        return (
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', paddingBottom:30 }}>
                <TouchableOpacity onPress={callback} style={styles.button}>
                    <Text>{text}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this._clearTimer} style={styles.button}>
                    <Text>Clear</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        width: 100,
        height: 30,
        padding: 10,
        backgroundColor: 'lightgray',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 3
    }
});

export default Buttons
