import React, {useContext} from 'react';
import { UserContext } from "../context/UserContext";
import {signOut} from "firebase/auth";
import {auth} from "../firebase-config";
import { useNavigate } from "react-router-dom";

export default function NavConnected(props) {
    const { currentUser } = useContext(UserContext);
    const navigate = useNavigate();

    const logOut = async () => {
        try {
            await signOut(auth);
            navigate('/');
            window.location.reload();
        } catch {
            console.log("We can't logOut")
        }
    }

    return (
        <section>
            <button title={ currentUser.email } className="btn btn-primary">{ currentUser.email[0].toUpperCase() }</button>
            <button onClick={logOut} className="btn btn-danger ms-2" title='Sign Out'>
                <i className="fa-solid fa-right-from-bracket"></i>
            </button>
        </section>
    );
}

