import './App.css';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const [totalScore, setTotalScore] = useState('')
  const [totalBall, setTotalBall] = useState("")
  const [yourScore, setYourScore] = useState(0)
  const [needToWin, setNeedToWin] = useState(0)
  const [show, setShow] = useState(true)
  const [time, setTime] = useState(5)
  const [playing, setPlaying] = useState(false)
  const getOpponentScore = () => {
    const TotalScr = Math.round(Math.random() * 36)
    setTotalScore(TotalScr)
    setNeedToWin(TotalScr)
    setTotalBall(6)
    setYourScore(0);
  }
  const waitFor5Sec = () => {
    if (show) {
      const intervalId = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);

      setTimeout(() => {
        setShow(true);
        setNeedToWin(0);
        setYourScore(0);
        setTotalBall(0);
        setTotalScore(0);
        setTime(5)
        clearInterval(intervalId);
      }, 5000);
    }
  };

  useEffect(() => {
    if (totalScore < yourScore) {
      toast.success(`Congrulation you won the match!`)
      setShow(false)
      waitFor5Sec()
    }
    if (totalBall == 0) {
      if (totalScore == yourScore) {
        toast.success(`Match drawn`)
        setShow(false)
        waitFor5Sec()
      }
      if (totalScore > yourScore) {
        toast.error('You lost the match')
        setShow(false)
        waitFor5Sec()
      }
    }
  }, [totalBall, yourScore])


  const playBall = () => {
    setPlaying(true)
    setTimeout(() => {
      setPlaying(false)
      let runHitOnBall = Math.round(Math.random() * 6)
      const updatedRunToWin = needToWin - runHitOnBall
      const remainingBall = totalBall - 1
      if (remainingBall > 0)
        setTotalBall(remainingBall)
      else setTotalBall(0)

      if (updatedRunToWin > 0)
        setNeedToWin(updatedRunToWin)
      else if (updatedRunToWin <= 0) setNeedToWin(0)
      setYourScore(yourScore + runHitOnBall)
    }, 2000);

  }

  return (
    <>
      {show ? <>
        <h2>NEED {needToWin} RUN IN {totalBall} BALL </h2>
        <h2>YOUR SCORE : {yourScore} </h2>
        <button onClick={getOpponentScore}>OPPONENT SCORE</button>
        <button onClick={playBall}> {playing ? "PLAYING..." : "PLAY BALL"}</button>
      </> : <h1>Please Wait {time}...</h1>}</>
  );
}

export default App;
