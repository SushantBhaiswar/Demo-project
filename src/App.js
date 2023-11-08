import './App.css';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

function App() {
  const [totalScore, setTotalScore] = useState('')
  const [totalBall, setTotalBall] = useState(0)
  const [yourScore, setYourScore] = useState(0)
  const [needToWin, setNeedToWin] = useState(0)
  const [show, setShow] = useState(true)
  const [time, setTime] = useState(5)
  const [playing, setPlaying] = useState(false)
  const [opponentScoreGot, setOpponentScoreGot] = useState(false)
  const [runs, setRuns] = useState([])
  const getOpponentScore = () => {
    const TotalScr = Math.round(Math.random() * 36)
    setTotalScore(TotalScr)
    setNeedToWin(TotalScr)
    setTotalBall(6)
    setYourScore(0);
    setOpponentScoreGot(true)
  }

  const waitFor5Sec = () => {
    if (show) {
      const intervalId = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);

      setTimeout(() => {
        setShow(true);
        setOpponentScoreGot(false)
        setRuns([]);
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
    if (totalScore < yourScore && opponentScoreGot) {
      toast.success(`Congrulation you won the match!`)
      setShow(false)
      waitFor5Sec()
    }
    if (totalBall === 0 && opponentScoreGot) {
      if (totalScore === yourScore) {
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
  }, [totalBall, yourScore, opponentScoreGot])


  const playBall = () => {
    setPlaying(true)
    setTimeout(() => {
      setPlaying(false)
      let runHitOnBall = Math.round(Math.random() * 6)
      const updatedRunToWin = needToWin - (runHitOnBall === 5 ? 1 : runHitOnBall)
      let remainingBall;
      // if run is 5 then consider it as wide
      if (runHitOnBall !== 5) remainingBall = totalBall - 1
      else remainingBall = totalBall

      if (remainingBall > 0)
        setTotalBall(remainingBall)
      else setTotalBall(0)

      if (updatedRunToWin > 0)
        setNeedToWin(updatedRunToWin)
      else if (updatedRunToWin <= 0) setNeedToWin(0)
      runs.push(runHitOnBall === 5 ? 'Wd' : runHitOnBall)
      setRuns(runs)
      setYourScore(yourScore + (runHitOnBall === 5 ? 1 : runHitOnBall))
    }, 2000);

  }
  return (

    <div className='Main-Box'>
      <div className='Score-Card'>
        {
          <>
            {opponentScoreGot ?
              <h2 className='Change-color'>OPPONENT SCORE : {totalScore}</h2> :
              <h2 className='Change-color'>GET OPPONENT SCORE</h2>}
            <h2>NEED {needToWin} RUN IN {totalBall} BALL </h2>
            <h2>YOUR SCORE : {yourScore} </h2>
            {opponentScoreGot ? <div className='Last-Ball-Played' >
              <div>
                {runs.map((el) => <h1>{el}</h1>)}
              </div>
            </div> : ''}
          </>
        }
      </div>

      {
        <div className='Play-Buttons'>
          {show ?
            !opponentScoreGot ?
              <button className='Opponent-Button' onClick={getOpponentScore}>OPPONENT SCORE</button> :
              playing ? <button className='Play-Ball-Button disabledBts' disabled> PLAYING...</button> :
                <button className='Play-Ball-Button' onClick={playBall} > PLAY </button>
            :
            <div className='Wait_Box'>  <h2>Please Wait {time}...</h2></div>
          }
        </div>
      }

    </div>
  );
}

export default App;
