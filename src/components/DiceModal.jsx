import React from 'react';
import Dice from '../assets/dice.png';
import one from '../assets/one.png';
import two from '../assets/two.png';
import three from '../assets/three.png';
import four from '../assets/four.png';
import five from '../assets/five.png';
import six from '../assets/six.png';
import { useNavigate } from 'react-router-dom';


const DiceModal = ({ winner }) => {

  const navigate = useNavigate();
  let diceImage;
  switch (winner?.toLowerCase()) {
    case "one":
      diceImage = one;
      break;
    case "two":
      diceImage = two;
      break;
    case "three":
      diceImage = three;
      break;
    case "four":
      diceImage = four;
      break;
    case "five":
      diceImage = five;
      break;
    case "six":
      diceImage = six;
      break;
  }

  const handleOnClose = () => {
    navigate('/');
  }
  return (
    <div className='modal'>
      <div className="modal-content">
        <img src={diceImage} alt="Coin Img" className='modal-image' />
        <h3 className='modal-text'>{winner} Won</h3>
        <button className='modal-button' onClick={handleOnClose}>Close</button>
      </div>
    </div>
  )
}

export default DiceModal