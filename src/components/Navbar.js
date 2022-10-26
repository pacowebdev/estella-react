import React, { useContext } from 'react';
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";

import NavConnected from "./NavConnected";
import NavDisconnected from "./NavDisconnected";

export default function Navbar() {
    const { currentUser } = useContext(UserContext);

    return (
        <nav className='navbar navbar-light bg-light px-4'>
            <section>
                <Link to='/' title='Home'><i className="fa-solid fa-house"></i></Link>
                { currentUser &&
                    <Link title='Admin' to='/private/private-home'>
                        <i className="fa-solid fa-gear ms-2"></i>
                    </Link>
                }
            </section>
            { currentUser ? <NavConnected /> : <NavDisconnected /> }
        </nav>
    );
}
