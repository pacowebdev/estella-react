import { createContext, useEffect, useState } from "react";

import { auth } from "../utils/firebase-config";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged
} from 'firebase/auth';


export const UserContext = new createContext();

export function UserContextProvider(props) {
    // Firebase
    const [ currentUser, setCurrentUser ] = useState();
    const [ loadingData, setLoadingData ] = useState(true);
    const [ validation, setValidation ] = useState('');

    const closeModal = () => {
        setValidation('');
        toggleModals('close');
    }


    const signUp = (email, password) => createUserWithEmailAndPassword(auth, email, password);
    const signIn = (email, password) => signInWithEmailAndPassword(auth, email, password);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setCurrentUser(currentUser);
            setLoadingData(false);
            console.log('CurrentUser', currentUser)
            return unsubscribe;
        })
    }, [])

    // Modal
    const [ modalState, setModalState ] = useState({
        signUpModal: false,
        signInModal: false
    });

    const toggleModals = modal => {
        if(modal === 'signUp') {
            setModalState({
                signUpModal: true,
                signInModal: false
            })
        }
        if(modal === 'signIn') {
            setModalState({
                signUpModal: false,
                signInModal: true
            })
        }
        if(modal === 'close') {
            setModalState({
                signUpModal: false,
                signInModal: false
            })
        }
    }

    return (
        <UserContext.Provider value={{
            modalState,
            currentUser,
            validation,
            closeModal,
            toggleModals,
            signUp,
            signIn
        }}>
            { !loadingData && props.children }
        </UserContext.Provider>
    )
}

