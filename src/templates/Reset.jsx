import React, {useState, useCallback} from 'react';
import {TextInput} from "../components/UIkit";
import {useDispatch} from "react-redux";
import {resetPassword} from "../reducks/users/operations";
import {push} from "connected-react-router"
import "../assets/styles/resetPage.scss"

const Reset = () => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState("")

    const inputEmail = useCallback((e) => {
        setEmail(e.target.value)
    },[]);

    return (
        <div className="c-section-container">
            <h2 className="u-text-center u-text__headline">Reset password</h2>
            <div className="module-spacer--medium" />
            <TextInput
                fullWidth={true} label={"email"} multiline={false} required={true}
                rows={1} value={email} type={"email"} onChange={inputEmail}
            />
            <div className="module-spacer--medium" />
            <div className="center">
              <button className="submitButton" onClick={() => dispatch(resetPassword(email))}>
                Submit
              </button>
                
                <div className="module-spacer--small" />
                <p className="u-text-small"onClick={() => dispatch(push('/signin'))}>Back to Sign in</p>
            </div>
        </div>
    );
};

export default Reset;