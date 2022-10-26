import React from 'react';
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignUpModal from "./components/SignUpModal";
import SignInModal from "./components/SignInModal";
import Private from "./pages/Private/Private";
import Admin from "./pages/Private/PrivateHome/Admin";
import './styles/app.css';

function App() {
    return (
        <>
            <SignUpModal />
            <SignInModal />
            <Navbar />
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/private' element={<Private />}>
                    <Route path={'/private/admin'} element={<Admin />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;