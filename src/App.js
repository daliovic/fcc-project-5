import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import { BiUpArrow, BiDownArrow } from 'react-icons/bi';
import { GrPowerReset, GrCirclePlay } from 'react-icons/gr';
import { useRef, useState } from 'react';
import Countdown from 'react-countdown';

function App() {
  const [breakLength, setBreakLength] = useState(5)
  const [sessionLength, setSessionLength] = useState(3)
  const [manualStart, setManualStart] = useState(false)

  const countDownRef = useRef()

  const breakInc = () => {
    setBreakLength(breakLength + 1)
  }
  const breakDec = () => {
    if (breakLength > 0) setBreakLength(breakLength - 1)
  }
  const sessionInc = () => {
    setSessionLength(sessionLength + 1)
  }
  const sessionDec = () => {
    if (sessionLength > 0) setSessionLength(sessionLength - 1)
    console.log("--");
  }



  const rendererBreak = ({ hours, minutes, seconds, completed }) => {

    console.log("Break");
    minutes += hours * 60;
    if (completed) {
      return (<Countdown renderer={rendererSession}
        date={Date.now() + (sessionLength * 1000 * 60)}
        autoStart={true}
        ref={countDownRef} />);
    } else {
      // Render a countdown
      console.log();
      return <span>{(minutes < 10) ? "0" + minutes : minutes}:{(seconds < 10) ? "0" + seconds : seconds}</span>;
    }
  };


  const rendererSession = ({ hours, minutes, seconds, completed, started }) => {
    console.log("Session");
    minutes += hours * 60;
    if (completed) {
      if (manualStart) return(<Countdown renderer={rendererBreak}
        date={Date.now() + (breakLength * 1000 * 60)}
        autoStart={true}
        ref={countDownRef} />);
      else {
      console.log(manualStart);
      return <span>{(minutes < 10) ? "0" + minutes : minutes}:{(seconds < 10) ? "0" + seconds : seconds}</span>;}

    } 
    else {
      // Render a countdown
      console.log();
      return <span>{(minutes < 10) ? "0" + minutes : minutes}:{(seconds < 10) ? "0" + seconds : seconds}</span>;
    }

  };

  const startStopHandler = () => {
    if (!countDownRef.current.isStarted()) {
      countDownRef.current.start()
      setManualStart(true)
    } else countDownRef.current.pause();

    console.log(countDownRef.current);
  }

  const resetHandler = () => {
    countDownRef.current.stop()
    setBreakLength(5)
    setSessionLength(2)
    setManualStart(false
      )
  }

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
            <h2 id="timer-label">Session</h2>
            <p id="time-left">
              <Countdown renderer={rendererSession}
                date={Date.now() + (sessionLength * 1000 * 60)}
                autoStart={false}
                ref={countDownRef} />
            </p>
          </div>
          <div className='row d-flex  justify-content-around'>
            <i id="start_stop" className='btn btn-primary col-4 text-white' onClick={startStopHandler}><GrCirclePlay /></i>
            <i id="reset" className='btn btn-primary col-4 text-white' onClick={resetHandler}><GrPowerReset /></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
