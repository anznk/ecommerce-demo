import React, {useCallback} from 'react';
import {useDispatch} from "react-redux";
import {push} from "connected-react-router"
import "../assets/styles/orderComplete.scss"

const OrderComplete = () => {
    const dispatch = useDispatch()

    const goBackToTop = useCallback(() => {
        dispatch(push('/'))
    }, [])

    return (
        <div className="c-section-container">
            <p>Thank you for shopping</p>
            <div className="module-spacer--medium" />
            <div className="buttonArea">
            <button className="goBackButton" onClick={goBackToTop}>Continue shopping</button>
            </div>
            {/* <PrimaryButton label="continue shopping" onClick={goBackToTop} /> */}
        </div>
    );
};

export default OrderComplete;