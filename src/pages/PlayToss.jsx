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
    const [joined, setJoined] = useState(false);
    const [countdown, setCountdown] = useState(0);
    // const [name, setName] = useState('');
    // const [room, setRoom] = useState('');
    const [isCountDown, setIsCountdown] = useState(false);
    const [isAmount, setIsAmount] = useState(false);
    const [winner, setWinner] = useState('');
    const [amount, setAmount] = useState(5);

    // handle joined 
    const handleJoined = () => {
        setIsAmount(true);
    }

    // handle joined with amount
    const handleJoinedWithAmount = () => {
        if (Number(currentUser?.credits) >= Number(amount)) {
            socket.emit('join-toss-lobby', { name: currentUser?.name, room: 'toss-lobby', amount });
            setIsAmount(false);
            setAmount(5);
            setJoined(true);
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

    // // handle reset room 
    // const handleResetRoom = () => {
    //     setCurrentTab('');
    //     setJoined(false);
    //     setCountdown(0);
    //     setIsCountdown(false);
    //     setWinner('');
    // }

    // handle choose side 
    const handleChooseSide = (side) => {

        if (!isCountDown) {
            setCurrentTab(side);
            socket.emit('choose-side', { side });
        } else {
            console.log('you cant choose in the middle of the game');
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
            setIsCountdown(true);
        })

        return () => {
            socket.off('toss-lobby-countdown');
        }
    }, [socket]);

    useEffect(() => {

        // announce winner 
        socket.once('toss-winner', data => {
            console.log(data);
            setIsCountdown(false);
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
            {isAmount && <EnterAmountModal amount={amount} setAmount={setAmount} handleJoinedWithAmount={handleJoinedWithAmount}/>}
            {winner !== "" && <CoinTossModal winner={winner} />}
            <div className='playToss'>
                <div className="playToss-content">

                    <div className="animation">
                        <Lottie animationData={CoinFlipAnimation} loop={isCountDown ? true : false} />
                    </div>

                    {isCountDown === true &&
                        <div className="countdown-content">
                            <div className="countdown">
                                {countdown}
                            </div>
                        </div>
                    }

                    {/* <form>
                        <input type="text" placeholder='enter name' value={name} onChange={(e) => setName(e.target.value)} />
                        <input type="text" placeholder='enter room' value={room} onChange={(e) => setRoom(e.target.value)} />
                    </form> */}

                    {joined === true ?
                        <>
                            {!isCountDown ?
                                <div className="playToss-options">
                                    <div className={`playToss-option ${currentTab === "Heads" ? "active" : ""}`} onClick={() => handleChooseSide('Heads')} >Heads</div>
                                    <div className={`playToss-option ${currentTab === "Tails" ? "active" : ""}`} onClick={() => handleChooseSide('Tails')}>Tails</div>
                                </div>
                                :
                                <p className='countdown-text'>Please wait until the current game is finished </p>}

                        </>
                        :
                        <>
                            <div className="ready-cta">
                                {isCountDown ?
                                    <p className='countdown-text'>Please wait until the current game is finished </p>
                                    :
                                    <button className='readyBtn' onClick={handleJoined}>Play Game</button>
                                }
                            </div>
                        </>
                    }



                </div>
            </div>
        </>
    )
}

export default PlayToss

