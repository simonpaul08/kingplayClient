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
    const [countdown, setCountdown] = useState(0);
    // const [name, setName] = useState('');
    // const [room, setRoom] = useState('');
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
            socket.volatile.emit('join-dice-lobby', { name: currentUser?.name, room: 'dice-lobby', amount, side: currentTab });
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
                    <div className="countdown-content">
                        <div className="countdown">
                            {countdown}
                        </div>
                    </div>

                    {/* <form>
                        <input type="text" placeholder='enter name' value={name} onChange={(e) => setName(e.target.value)} />
                        <input type="text" placeholder='enter room' value={room} onChange={(e) => setRoom(e.target.value)} />
                    </form> */}

                    <>
                        <div className="dice-options">
                            <div className={`dice-option ${currentTab === "1" ? "active" : ""}`} onClick={() => handleClickOnSide('1')}>1</div>
                            <div className={`dice-option ${currentTab === "2" ? "active" : ""}`} onClick={() => handleClickOnSide('2')}>2</div>
                            <div className={`dice-option ${currentTab === "3" ? "active" : ""}`} onClick={() => handleClickOnSide('3')}>3</div>
                            <div className={`dice-option ${currentTab === "4" ? "active" : ""}`} onClick={() => handleClickOnSide('4')}>4</div>
                            <div className={`dice-option ${currentTab === "5" ? "active" : ""}`} onClick={() => handleClickOnSide('5')}>5</div>
                            <div className={`dice-option ${currentTab === "6" ? "active" : ""}`} onClick={() => handleClickOnSide('6')}>6</div>
                        </div>

                    </>



                </div>
            </div>
        </>
    )
}

export default PlayDice