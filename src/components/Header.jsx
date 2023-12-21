import React from 'react';
import { FaUser } from 'react-icons/fa';
import { IoMdRefresh } from "react-icons/io";
import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const Header = () => {
  const { currentUser } = useAuthContext();
  return (
    <div className='header'>
      <div className="header-content">
        <Link to="/" className="header-logo">
          <h3> Play King </h3>
        </Link>
        <Link to="profile" className="header-data">
          <div className="header-wallet">
            <p>₹ {currentUser?.credits || "100"}</p>
          </div>
          <FaUser size={30} color='#fff' className='header-icon' />
        </Link>
      </div>
    </div>
  )
}

export default Header