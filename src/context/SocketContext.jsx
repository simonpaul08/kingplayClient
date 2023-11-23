import { createContext, useContext } from "react";
import { io } from "socket.io-client";


const socketContext = createContext();

export const useSocketContext = () => {
    return useContext(socketContext);
}

const SocketContextProvider = ({ children }) => {

    const socket = io(`${import.meta.env.VITE_APP_URL}`);

    let value = {
        socket
    }

    return (
        <socketContext.Provider value={value}>
            { children }
        </socketContext.Provider>
    )
}

export default SocketContextProvider;