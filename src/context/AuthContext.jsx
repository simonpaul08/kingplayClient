import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext);
}

const AuthContextProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(null);

    // activate user 
    const activateUser = (user) => {
        setCurrentUser(user);
        window.localStorage.setItem('kingPlay-user', JSON.stringify(user));
    }

    // logout
    const logout = () => {
        setCurrentUser(null);
        window.localStorage.removeItem('kingPlay-user');
    }


    // persist user
    useEffect(() => {
        let user = JSON.parse(window.localStorage.getItem('kingPlay-user'));

        if(user){
            setCurrentUser(user);
        }
        
    }, [])


    let value = {
        currentUser,
        activateUser,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;