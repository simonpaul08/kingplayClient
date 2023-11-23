import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuthContext } from '../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import Loader from '../components/Loader/Loader';
import VerifyOtpModal from '../components/VerifyOtpModal';

const Register = () => {

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    const { activateUser } = useAuthContext();
    const [isLoading, setIsLoading] = useState(false);
    const [isOtp, setIsOtp] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();

        setIsLoading(true);

        try {
            const res = await axios.post(`${import.meta.env.VITE_APP_URL}/auth/register`, { phone });
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
            <div className='register'>
                <div className="register-content">
                    <form className="register-form" onSubmit={handleRegister}>
                        <h3 className='register-form-text'>Register </h3>
                        <input type="text" className='register-form-input'
                            value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter Name' required />
                        <input type="text" className='register-form-input'
                            value={phone} onChange={(e) => setPhone(e.target.value)} placeholder='Enter Phone No.'  accept='/([0-9])/g' required />
                        <button className='register-form-btn' type='submit'>{isLoading ? <Loader /> : "Register"}</button>
                        <div className="redirect-wrapper">
                            <p className='redirect'>Already Have An Account ? <Link to="/login" className='redirect-link'>Login</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register