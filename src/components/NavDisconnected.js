import React from "react";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export default function NavDisconnected () {
    const { toggleModals } = useContext(UserContext);

    return (
        <section>
            <button
                onClick={ () => toggleModals('signUp') }
                className="btn btn-primary"
                title='Sign Up'
            >
                <i className="fa-solid fa-user-plus"></i>
            </button>
            <button
                onClick={ () => toggleModals('signIn') }
                className="btn btn-primary ms-2"
                title='Sign In'
            >
                <i className="fa-solid fa-user"></i>
            </button>
        </section>
    )
}