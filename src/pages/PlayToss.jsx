import React, { useEffect, useState } from 'react'
import { useSocketContext } from '../context/SocketContext';
import { useNavigate } from 'react-router-dom';
import CoinFlipAnimation from '../assets/animation1.json';
import Lottie from 'lottie-react';
import CoinTossModal from '../components/CoinTossModal';
import EnterAmountModal from '../components/EnterAmountModal';
import { useAuthContext } from '../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';

const PlayToss = () => {

    const { socket } = useSocketContext();
    const { currentUser } = useAuthContext();
    const [currentTab, setCurrentTab] = useState('');
    const [countdown, setCountdown] = useState(0);
    const [isCountDown, setIsCountdown] = useState(false);
    const [isAmount, setIsAmount] = useState(false);
    const [winner, setWinner] = useState('');
    const [amount, setAmount] = useState(5);


    // handle click on side 
    const handleClickOnSide = (side) => {
        if (currentTab === "") {
            setCurrentTab(side);
            setIsAmount(true);
        } else {
            toast.error("Invalid Option",
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
    }

    // handle joined with amount
    const handleJoinedWithAmount = () => {
        if (Number(currentUser?.credits) >= Number(amount)) {
            if (!isCountDown) {
                socket.emit('join-toss-lobby', { name: currentUser?.name, room: 'toss-lobby', amount, side: currentTab });
            } else {
                console.log('you cant choose in the middle of the game');
            }
            setIsAmount(false);
            setAmount(5);
        } else {
            toast.error("Not Enough Credits",
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
            setAmount(5);
        }
    }


    // catch every other socket event
    useEffect(() => {
        socket.once('message', data => {
            console.log(data);
        })

        return () => {
            socket.off('message');
        }
    }, [socket]);

    useEffect(() => {

        // toss lobby countdown 
        socket.on('toss-lobby-countdown', data => {
            setCountdown(data);
        })

        return () => {
            socket.off('toss-lobby-countdown');
        }
    }, [socket]);

    useEffect(() => {

        // announce winner 
        socket.once('toss-winner', data => {
            console.log(data);
            setWinner(data);
            socket.emit('toss-lobby-reset');
        })

        return () => {
            socket.off('toss-winner');
        }
    }, [socket]);



    useEffect(() => {

        // join the room 
        socket.emit('join-toss');

        return () => {
            // leave the room
            socket.emit('leave-toss-lobby')
        }
    }, [])

    return (
        <>
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
            {isAmount && <EnterAmountModal amount={amount} setAmount={setAmount} handleJoinedWithAmount={handleJoinedWithAmount} />}
            {winner !== "" && <CoinTossModal winner={winner} />}
            <div className='playToss'>
                <div className="playToss-content">

                    <div className="animation">
                        <Lottie animationData={CoinFlipAnimation} loop={isCountDown ? true : false} />
                    </div>

                    <div className="countdown-content">
                        <div className="countdown">
                            {countdown}
                        </div>
                    </div>


                    {/* <form>
                        <input type="text" placeholder='enter name' value={name} onChange={(e) => setName(e.target.value)} />
                        <input type="text" placeholder='enter room' value={room} onChange={(e) => setRoom(e.target.value)} />
                    </form> */}

                    {/* {joined === true ? */}
                    <>
                        <div className="playToss-options">
                            <div className={`playToss-option ${currentTab === "Heads" ? "active" : ""}`} onClick={() => handleClickOnSide('Heads')} >Heads</div>
                            <div className={`playToss-option ${currentTab === "Tails" ? "active" : ""}`} onClick={() => handleClickOnSide('Tails')}>Tails</div>
                        </div>

                    </>
                    {/* // :
                        // <>
                        //     <div className="ready-cta">
                        //         {isCountDown ?
                        //             <p className='countdown-text'>Please wait until the current game is finished </p>
                        //             :
                        //             <button className='readyBtn' onClick={handleJoined}>Play Game</button>
                        //         }
                        //     </div>
                        // </> */}
                    {/* } */}



                </div>
            </div>
        </>
    )
}

export default PlayToss

