import React, { PropTypes } from 'react'
import { connect } from 'react-redux';
import { setPomodoroLength, setBreakLength, setActivityType,
    startTimer, tickTimer, pauseTimer, clearTimer, finishTimer
} from '../actions'
import Root from '../components/root'

const mapStateToProps = (state) => ({
    pomodoroLength: state.pomodoroLength,
    breakLength: state.breakLength,
    activity_type: state.activity_type,
    timer: state.timer
})

const mapDispatchToProps = (dispatch) => ({
    setBreakLength: (l) => dispatch(setBreakLength(l)),
    setActivityType: (t) => dispatch(setActivityType(t)),
    setPomodoroLength: (l) => dispatch(setPomodoroLength(l)),
    startTimer: (t) => dispatch(startTimer(t)),
    tickTimer: (t) => dispatch(tickTimer(t)),
    pauseTimer: (t) => dispatch(pauseTimer(t)),
    clearTimer: () => dispatch(clearTimer()),
    finishTimer: () => dispatch(finishTimer())
})

export default connect(mapStateToProps, mapDispatchToProps)(Root)