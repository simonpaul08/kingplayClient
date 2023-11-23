import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useAuthContext } from '../context/AuthContext';
import axios from 'axios';
import Loader from '../components/Loader/Loader';
import VerifyOtpModal from '../components/VerifyOtpModal';

const Login = () => {

    const [phone, setPhone] = useState('');
    const { activateUser } = useAuthContext();
    const [isLoading, setIsLoading] = useState(false);
    const [isOtp, setIsOtp] = useState(false);

    const handleLogin = async (e) => {

        e.preventDefault();

        setIsLoading(true);

        // setIsOtp(true);

        try {
            const res = await axios.post(`${import.meta.env.VITE_APP_URL}/auth/login`, { phone });
            console.log(res.data);
            if (res.data?.message) {
                setIsOtp(true);
                toast.success(res.data?.message, {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
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
        {isOtp && <VerifyOtpModal phone={phone}/>}
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

            <div className='login'>
                <div className="login-content">
                    <form className='login-form' onSubmit={handleLogin}>
                        <h3 className='login-form-text'>Login </h3>
                        <input type="text" className='login-form-input'
                            value={phone} onChange={(e) => setPhone(e.target.value)} placeholder='Enter Phone No.' maxLength={10} required />
                        <div className="forget-password-wrapper">
                            <p className='forget-password'>Forget Password!</p>
                        </div>
                        <button className='login-form-btn'>{isLoading ? <Loader /> : "Login"}</button>
                        <div className="redirect-wrapper">
                            <p className='redirect'>Don't Have An Account ? <Link to="/register" className='redirect-link'>Register</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login