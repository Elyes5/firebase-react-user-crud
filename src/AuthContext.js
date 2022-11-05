import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { auth } from "./firebase-config";
import { onAuthStateChanged } from "firebase/auth";
export const AuthContext = React.createContext();
export const AuthProvider = ({ children }) =>{
    const [currentUser,setCurrentUser] = useState(null)
    const [loading,setLoading] = useState(true);
useEffect(() =>{
     onAuthStateChanged(auth, (user) =>{
        setCurrentUser(user);
        setLoading(false);
    })
},[]);
    return(
        <AuthContext.Provider value={{currentUser,loading}}>
            {children}
        </AuthContext.Provider>
    );

};