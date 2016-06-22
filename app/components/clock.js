import React, { PropTypes } from 'react'

import {
    View,
    Text,
    StyleSheet
} from 'react-native'


class Clock extends React.Component {

    constructor() {
        super()
        this.setActivityType = this.setActivityType.bind(this)
    }

    setActivityType(e) {
        let p = this.props
        p.act(e.currentTarget.innerText.toLowerCase())
    }

    render () {
        const p = this.props
        let fin = p.timer.is_finished
        let stateRelatedCallback = this.setActivityType
        let clockCSSClass = ""
        let time, humanTime, status
        let hours, mins, secs

        if (p.timer.is_active) {
            if (p.type == "p") {
                clockCSSClass = " pomodoro-clock"
            } else {
                clockCSSClass = " break-clock"
            }
        }

        if (fin) {
            time = new Date(0)
        } else {
            time = (p.timer.time !== 0) ? new Date(p.timer.time) : new Date(p.children)
        }

        hours = time.getHours()
        mins = time.getMinutes()
        secs = time.getSeconds()

        if (hours >= 17) mins = "6" + mins
        mins = (mins < 10) ? "0" + mins : mins
        secs = (!secs || secs < 10) ? "0" + secs : secs

        stateRelatedCallback = (p.timer.is_active || p.timer.paused) ? false : stateRelatedCallback
        humanTime = (fin) ? status : mins + ':' + secs

        return (
            <View style={{}}>
                <Text style={{fontSize: 32}}>{humanTime}</Text>
            </View>
        )
    }
}

export default Clock
