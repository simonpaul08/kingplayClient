import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Loader from './Loader/Loader';
import { ToastContainer, toast } from 'react-toastify';
import { useAuthContext } from '../context/AuthContext';

const VerifyOtpModal = ({ phone }) => {

  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { activateUser } = useAuthContext();

  // handle verify
  const handleVerify = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    // activateUser({ name: "Simon", phone: "7983083533", credits: "100" });


    try {
      const res = await axios.post(`${import.meta.env.VITE_APP_URL}/auth/verify`, { phone, otp });
      console.log(res.data);
      if (res.data?.user) {
        toast.success("Otp Verified Successfully", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          onClose: () => {
            activateUser(res.data?.user);
          }
        })
      }
    } catch (e) {
      console.log(e);

      if (e?.response?.data?.message) {

        toast.error(e?.response?.data?.message, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })

      } else {
        toast.error("Something Went Wrong",
          {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        )
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className='modal'>
        <div className="modal-content">
          <form onSubmit={handleVerify}>
            <h3 className='modal-text'>Verify OTP</h3>
            <input type="text" placeholder='Enter OTP' value={otp}
              onChange={(e) => setOtp(e.target.value)} className='login-form-input' required />
            <button className='modal-button'>{isLoading ? <Loader /> : "Verify"}</button>
          </form>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
    </>

  )
}

export default VerifyOtpModal