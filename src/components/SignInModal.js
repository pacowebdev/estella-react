import React, { useContext, useRef, useState } from 'react';
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

function SignInModal() {
    const { modalState, signIn, closeModal } = useContext(UserContext);
    const [ validation, setValidation ] = useState('');
    const navigate = useNavigate();

    const inputs = useRef([])
    const addInputs = el => {
        if(el && !inputs.current.includes(el)){
            inputs.current.push(el)
        }
    }

    const handelSignIn = async (e) => {
        e.preventDefault();
        try {
            await signIn(
                inputs.current[0].value,
                inputs.current[1].value
            )
        closeModal();
        navigate('/private/admin')
        } catch (err) {
            console.log(err.code);
            setValidation('email and/or password incorrect');
        }
    }

    return (
        <>
            { modalState.signInModal && (
                <section className="position-fixed top-0 vw-100 vh-100">
                    <div
                        onClick={closeModal}
                        className="w-100 h-100 bg-dark bg-opacity-75"
                    ></div>
                    <div className="position-absolute top-50 start-50 translate-middle"
                        style={{ minWidth: "400px" }}
                    >
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Sign In</h5>
                                    <button
                                        onClick={closeModal}
                                        className="btn-close"></button>
                                </div>

                                <div className="modal-body">
                                    <form
                                        onSubmit={handelSignIn}
                                        className="sign-up-form"
                                    >
                                        <div className="mb-3">
                                            <label htmlFor="signInEmail" className="form-label">
                                                Email
                                            </label>
                                            <input
                                                ref={addInputs}
                                                name="email"
                                                required
                                                type="email"
                                                className="form-control"
                                                id="signInEmail"
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="signInPwd" className="form-label">
                                                Password
                                            </label>
                                            <input
                                                ref={addInputs}
                                                name="pwd"
                                                required
                                                type="password"
                                                className="form-control"
                                                id="signInPwd"
                                            />
                                            <p className="text-danger mt-1">{validation}</p>
                                        </div>

                                        <button className="btn btn-primary">Sign In</button>
                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}

export default SignInModal;