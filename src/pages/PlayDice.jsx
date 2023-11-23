import Lottie from 'lottie-react';
import DiceAnimation from '../assets/diceAnimation.json';
import { useEffect, useState } from 'react';
import { useSocketContext } from '../context/SocketContext';
import DiceModal from '../components/DiceModal';
import { ToastContainer, toast } from 'react-toastify';
import EnterAmountModal from '../components/EnterAmountModal';
import { useAuthContext } from '../context/AuthContext';

const PlayDice = () => {

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
            socket.emit('join-dice-lobby', { name: currentUser?.name, room: 'dice-lobby', amount });
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
            socket.emit('choose-dice-side', { side });
        } else {
            console.log('you cant choose in the middle of the game');
        }
    }

    // catch every other socket event
    useEffect(() => {
        socket.once('dice-message', data => {
            console.log(data);
        })

        return () => {
            socket.off('dice-message');
        }
    }, [socket]);


    useEffect(() => {

        // toss lobby countdown 
        socket.on('dice-lobby-countdown', data => {
            setCountdown(data);
            setIsCountdown(true);
        })

        return () => {
            socket.off('dice-lobby-countdown');
        }
    }, [socket]);

    useEffect(() => {

        // announce winner 
        socket.once('dice-winner', data => {
            console.log(data);
            setIsCountdown(false);
            setWinner(data);
            socket.emit('dice-lobby-reset');
        })

        return () => {
            socket.off('dice-winner');
        }
    }, [socket]);

    useEffect(() => {

        // join the room on component mount
        socket.emit('join-dice');

        return () => {
            // leave the room on component unmount
            socket.emit('leave-dice-lobby')
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
            {winner !== "" && <DiceModal winner={winner} />}
            <div className="playDice">
                <div className="playDice-content">

                    <div className="animation">
                        <Lottie animationData={DiceAnimation} loop={isCountDown ? true : false} />
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
                                <div className="dice-options">
                                    <div className={`dice-option ${currentTab === "1" ? "active" : ""}`} onClick={() => handleChooseSide('1')}>1</div>
                                    <div className={`dice-option ${currentTab === "2" ? "active" : ""}`} onClick={() => handleChooseSide('2')}>2</div>
                                    <div className={`dice-option ${currentTab === "3" ? "active" : ""}`} onClick={() => handleChooseSide('3')}>3</div>
                                    <div className={`dice-option ${currentTab === "4" ? "active" : ""}`} onClick={() => handleChooseSide('4')}>4</div>
                                    <div className={`dice-option ${currentTab === "5" ? "active" : ""}`} onClick={() => handleChooseSide('5')}>5</div>
                                    <div className={`dice-option ${currentTab === "6" ? "active" : ""}`} onClick={() => handleChooseSide('6')}>6</div>
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

export default PlayDice