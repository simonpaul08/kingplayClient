import React, { useState } from 'react'
import WhatsAppModal from '../components/WhatsAppModal'
import { useAuthContext } from '../context/AuthContext';

const Profile = () => {

  const { currentUser, logout } = useAuthContext();
  const [isWModal, setIsWModal] = useState(false);

  // close whatsapp modal
  const closeWhatsAppModal = () => {
    setIsWModal(false);
  }

  // open whatsapp modal
  const openWhatsAppModal = () => {
    setIsWModal(true);
  }

  return (
    <>
      {isWModal && <WhatsAppModal closeWhatsAppModal={closeWhatsAppModal} />}
      <div className='profile'>
        <div className="profile-content">
          <div className="profile-header">
            <h3> <span className='profile-header-span'>King Play</span>  {">"}  Profile</h3>
          </div>

          <div className="profile-section">
            <div className="profile-section-left">
              <h3 className='profile-detail-heading'>Profile Details: </h3>
              <div className="profile-details">
                <p className='name'>Name - {currentUser?.name || "Unknown"}</p>
              </div>
              <div className="profile-details">
                <p className='phone'>Phone - {currentUser?.phone || 9999999999}</p>
              </div>
              <button className='logout-btn' onClick={logout}>Logout</button>
            </div>
            <div className="profile-section-right">
              <h3 className="profile-section-credits">₹ {currentUser?.credits || "100"}</h3>
              <button className='withdraw-credits' onClick={openWhatsAppModal}>Withdraw</button>
              <button className='add-credits' onClick={openWhatsAppModal}>Add Credits</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile