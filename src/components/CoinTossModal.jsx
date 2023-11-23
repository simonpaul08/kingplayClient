import React from 'react';
import CoinImg from '../assets/coin-toss.png';
import { useNavigate } from 'react-router-dom';

const CoinTossModal = ({ winner }) => {

  const navigate = useNavigate();

  // handle on click close
  const handleOnClose = () => {
    navigate('/')
  }

  return (
    <div className='modal'>
      <div className="modal-content">
        <img src={CoinImg} alt="Coin Img" className='modal-image' />
        <h3 className='modal-text'>{winner} Won</h3>
        <button className='modal-button' onClick={handleOnClose}>Close</button>
      </div>
    </div>
  )
}

export default CoinTossModal