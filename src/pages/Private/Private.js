import React, { useContext } from 'react';
import { UserContext } from "../../context/UserContext";
import { Outlet, Navigate } from "react-router-dom";

export default function Private(props) {
    const { currentUser } = useContext(UserContext);
    // console.log('PRIVATE', currentUser);

    if(!currentUser) {
        return <Navigate to='/' />;
    }

    return (
        <div className='container'>
            <Outlet />
        </div>
    );
}

