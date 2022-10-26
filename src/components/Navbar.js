import React, { useContext } from 'react';
import { UserContext } from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";

import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase-config";

export default function Navbar() {
    const { currentUser, toggleModals } = useContext(UserContext);
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
        <>
             { currentUser ?
                (
                    <nav className='navbar navbar-light bg-light px-2'>
                        <div>
                            <Link to='/' title='Home'><i className="fa-solid fa-house"></i></Link>
                            <Link  to='/private/admin'>
                                <i className="fa-solid fa-gear ms-2"></i>
                            </Link>
                        </div>
                        <div>
                            <button title={ currentUser.email } className="btn btn-primary btn-sm rounded-circle">{ currentUser.email[0].toUpperCase() }</button>
                            <button onClick={logOut} className="btn ms-2 link-danger" title='Sign Out'>
                                <i className="fa-solid fa-right-from-bracket"></i>
                            </button>
                        </div>
                     </nav>
                 ) :
                 (
                     <nav className='navbar navbar-light bg-light px-2'>
                         <div>
                             <Link to='/' title='Home'><i className="fa-solid fa-house"></i></Link>
                             <button className='btn btn-link ms-2' onClick={() => toggleModals('signIn')} title='Admin'>
                                 <i className="fa-solid fa-gear"></i>
                             </button>
                         </div>
                         <div>
                             <button
                                 onClick={ () => toggleModals('signUp') }
                                 className="btn btn-link"
                                 title='Sign Up'
                             >
                                 <i className="fa-solid fa-user-plus"></i>
                             </button>
                             <button
                                 onClick={ () => toggleModals('signIn') }
                                 className="btn btn-link ms-2"
                                 title='Sign In'
                             >
                                 <i className="fa-solid fa-user"></i>
                             </button>
                         </div>
                     </nav>
                 )
             }
        </>
    );
}
