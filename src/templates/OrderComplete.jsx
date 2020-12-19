import React, {useCallback} from 'react';
import {PrimaryButton} from "../components/UIkit";
import {useDispatch} from "react-redux";
import {push} from "connected-react-router"

const OrderComplete = () => {
    const dispatch = useDispatch()

    const goBackToTop = useCallback(() => {
        dispatch(push('/'))
    }, [])

    return (
        <div className="c-section-container">
            <p>Thank you for shopping</p>
            <div className="module-spacer--medium" />
            <PrimaryButton label="continue shopping" onClick={goBackToTop} />
        </div>
    );
};

export default OrderComplete;