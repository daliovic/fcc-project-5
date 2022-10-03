import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import ringer from './notif.wav'

import { BiUpArrow, BiDownArrow } from 'react-icons/bi';
import { GrPowerReset, GrCirclePlay } from 'react-icons/gr';
import { useEffect, useRef, useState } from 'react';

function App() {
  const [breakLength, setBreakLength] = useState(5)
  const [sessionLength, setSessionLength] = useState(25)
  const [isStarted, setIsStarted] = useState(false)
  const [isReset, setIsReset] = useState(true)
  const [timer, setTimer] = useState(25 * 60*1000)
  const [formattedTimer, setFormattedTimer] = useState("")
  const [isBreak, setIsBreak] = useState(false)
  const audioRef = useRef()

  const breakInc = () => {
    if (breakLength < 60) {
      setBreakLength(breakLength + 1)
      setTimer((breakLength + 1) * 60*1000)
      updateFormattedTimer();
    }
  }
  const breakDec = () => {
    if (breakLength > 1) {
      setBreakLength(breakLength - 1)
      setTimer((breakLength - 1) * 60*1000)
      updateFormattedTimer();
    }
  }
  const sessionInc = () => {
    if (sessionLength < 60) {
      setSessionLength(sessionLength + 1)
      setTimer((sessionLength + 1) * 60 * 1000)
      updateFormattedTimer();
    }
  }
  const sessionDec = () => {
    if (sessionLength > 1) {
      setSessionLength(sessionLength - 1)
      setTimer((sessionLength - 1) * 60 * 1000)
      updateFormattedTimer();
    }
    console.log("--");
  }


  const startStopHandler = () => {
    setIsStarted(!isStarted)
    timerHandler()
    setIsReset(false)
    console.log(timer + " FROM START/STOP");
  }

  const resetHandler = () => {
    setIsStarted(false)
    setIsReset(true)
    setBreakLength(5)
    setSessionLength(25)
    setTimer(25 * 60 * 1000)
    setFormattedTimer(`25:00`);
    setIsBreak(false)
    console.log(timer + " FROM RESET");
    console.log("Before stop: "+audioRef.current.paused);
    audioRef.current.load()
    console.log("After stop: "+audioRef.current.paused);

  }

  const timerHandler = () => {
    if (isStarted) {
      if (timer > 0) {
        setTimeout(() => { setTimer(timer - 499); console.log(timer + " FROM TIMEOUT"); }, 499);
      }
      else {
        audioRef.current.play()
        if (!isBreak) {
          setTimer(breakLength * 60 * 1000);
          setIsBreak(true)
        } else {

          setTimer(sessionLength * 60 * 1000);
          setIsBreak(false)
        }

        console.log(timer + " FROM TIMEHANDLER");
      }
    }
  }

  function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }
  const updateFormattedTimer = () => {
    setFormattedTimer(`${padTo2Digits(Math.floor(timer / 60 / 1000))}:${padTo2Digits(Math.round((timer) / 1000 % 60))}`)
  }
  useEffect(() => {

    timerHandler()
    if ((!isReset)) {
      setFormattedTimer(`${padTo2Digits(Math.floor(timer / 60 / 1000))}:${padTo2Digits(Math.round((timer) / 1000 % 60))}`)
    } else {
      let currentTime = isBreak ? breakLength : sessionLength
      setTimer(currentTime * 60*1000)
      setFormattedTimer(`${padTo2Digits((currentTime))}:${padTo2Digits(currentTime * 60 % 60)}`);
    }
    

  }, [timer, isStarted, sessionLength, isReset, isBreak, breakLength])

  return (
    <div className="container-fluid">
      <div className='row d-flex'>
        <div className='row d-flex justify-content-center mx-auto col-4 my-auto text-center'>
          <h1>25 + 5 Clock</h1>
          <div className='row d-flex justify-content-center'>
            <div className='row d-flex mx-0 px-0 col-6 text-center'>
              <h2 id="break-label" className=''>Break Length</h2>
              <div className='row d-flex justify-content-around mx-auto'>
                <i id="break-decrement" className='btn btn-primary px-0 mx-0 col-4' onClick={breakDec}><BiDownArrow /></i>
                <span id="break-length" className='col-4 my-auto'>{breakLength}</span>
                <i id="break-increment" className='btn btn-primary px-0 mx-0 col-4' onClick={breakInc}><BiUpArrow /></i>
              </div>
            </div>
            <div className='row d-flex mx-0 px-0 col-6 text-center'>
              <h2 id="session-label" className=''>Session Length</h2>
              <div className='row d-flex justify-content-around mx-auto'>
                <i id="session-decrement" className='btn btn-primary px-0 mx-0 col-4' onClick={sessionDec}><BiDownArrow /></i>
                <span id="session-length" className='col-4 my-auto'>{sessionLength}</span>
                <i id="session-increment" className='btn btn-primary px-0 mx-0 col-4' onClick={sessionInc}><BiUpArrow /></i>
              </div>
            </div>
          </div>
          <div className='row d-flex my-3'>
            <h2 id="timer-label">Session {isBreak ? <p>Break</p> : <p>Work!</p>}</h2>
            <p id="time-left">{formattedTimer}
            </p>
          </div>
          <div className='row d-flex  justify-content-around'>
            <i id="start_stop" className='btn btn-primary col-4 text-white' onClick={startStopHandler}><GrCirclePlay /></i>
            <i id="reset" className='btn btn-primary col-4 text-white' onClick={resetHandler}><GrPowerReset /></i>
          </div>
        </div>
      </div>
      <audio src={ringer} ref={audioRef} id="beep"></audio>
    </div>
  );
}

export default App;
