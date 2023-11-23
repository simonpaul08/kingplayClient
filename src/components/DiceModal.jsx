import React from 'react';
import Dice from '../assets/dice.png';
import { useNavigate } from 'react-router-dom';


const DiceModal = ({ winner }) => {

  const navigate = useNavigate();

  const handleOnClose = () => {
    navigate('/');
  }
  return (
    <div className='modal'>
      <div className="modal-content">
        <img src={Dice} alt="Coin Img" className='modal-image' />
        <h3 className='modal-text'>{winner} Won</h3>
        <button className='modal-button' onClick={handleOnClose}>Close</button>
      </div>
    </div>
  )
}

export default DiceModal