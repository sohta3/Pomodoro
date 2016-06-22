import React, { PropTypes } from 'react'
import Buttons from './buttons'

import {
    View,
    Text,
    StyleSheet
} from 'react-native'


class Controls extends React.Component {
    render () {
        let p = this.props
        return (
            <View>
                <Buttons
                    breakLength={p.breakLength}
                    pomodoroLength={p.pomodoroLength}
                    disabled={p.timer.is_active}
                    stopTimeout={p.stopTimeout}
                    timer={p.timer}
                    activityType={p.activityType}
                    sounds={{
                        tick: p.sounds.tick,
                        alarm: p.sounds.alarm
                    }}
                    acts={{
                        startTimer: p.acts.startTimer,
                        pauseTimer: p.acts.pauseTimer,
                        clearTimer: p.acts.clearTimer
                    }}
                />
            </View>
        )
    }
}

export default Controls
