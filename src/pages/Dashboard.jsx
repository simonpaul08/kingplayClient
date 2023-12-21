import React, { useEffect, useState } from 'react';
import CoinToss from '../assets/coin-toss.png';
import Dice from '../assets/dice.png';
import ComingSoon from '../assets/coming-soon.png';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import FullScreenLoader from '../components/FullScreenLoader';


const Dashboard = () => {

  const [isLoading, setIsLoading] = useState(false);
  const { updateUserCredits } = useAuthContext();


  useEffect(() => {
    updateUserCredits(setIsLoading);
  }, [])

  return (
    <>
    {isLoading && <FullScreenLoader />}
      <div className='dashboard'>
        <div className="dashboard-content">
          <div className="dashboard-header">
            <h3> <span className='dashboard-header-span'>King Play</span>  {">"}  Dashboard</h3>
          </div>
          <div className="games-section">
            <Link to="/play-toss" className="game-box">
              <img src={CoinToss} alt="coin-toss" />
              <h3 className='game-name'>Play Toss</h3>
            </Link>
            <Link to="/play-dice" className="game-box">
              <img src={Dice} alt="coin-toss" />
              <h3 className='game-name'>Play Dice</h3>
            </Link>
            <Link className="game-box">
              <img src={ComingSoon} alt="coin-toss" />
              <h3 className='game-name'>Coming Soon..</h3>
            </Link>
            <Link className="game-box">
              <img src={ComingSoon} alt="coin-toss" />
              <h3 className='game-name'>Coming Soon..</h3>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard