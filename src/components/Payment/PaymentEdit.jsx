import React, {useCallback, useEffect, useState, useMemo} from 'react';
import {CardElement, useElements} from "@stripe/react-stripe-js";
import {makeStyles} from "@material-ui/styles";
import {theme} from "../../assets/theme";
import {GreyButton, PrimaryButton, TextDetail} from "../UIkit";
import {useDispatch} from "react-redux";
import {retrievePaymentMethod, registerCard} from "../../reducks/payments/operations";
import {useStripe} from "@stripe/react-stripe-js";
import {getCustomerId, getPaymentMethodId} from "../../reducks/users/selectors";
import {useSelector} from "react-redux";
import {push} from "connected-react-router"
import {hideLoadingAction, showLoadingAction} from "../../reducks/loading/actions";

const useStyles = makeStyles({
    element: {
        backgroundColor: theme.palette.secondary.light,
        padding: 16,
    }
});

const PaymentEdit = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const stripe = useStripe();
    const element = useElements();
    const selector = useSelector((state) => state);
    const customerId = getCustomerId(selector);
    const paymentMethodId = getPaymentMethodId(selector);

    const [card, setCard] = useState({});

    const register = useCallback(() => {
        dispatch(registerCard(stripe, element, customerId))
    }, [stripe, element, customerId]);

    const goBackToMyPage = useCallback(() => {
        dispatch(push('/user/mypage'))
    }, [dispatch])

    useEffect(() => {
        (async() => {
            dispatch(showLoadingAction());
            const paymentMethod = await retrievePaymentMethod(paymentMethodId)
            dispatch(hideLoadingAction());
            if (paymentMethod) {
                setCard(paymentMethod)
            }
        })()
    },[customerId]);

    const cardNumber = useMemo(() => {
        if (card.last4) {
            return "**** **** **** " + card.last4
        } else {
            return "No information"
        }
    },[card])

    return (
        <section className="c-section-container">
            <h2 className="u-text__headline u-text-center">Add Payment infomation</h2>
            <div className="module-spacer--medium"/>
            <h3>Current Credit Card Info</h3>
            <div className="module-spacer--small" />
            <TextDetail label={card.brand} value={cardNumber} key={card.id}/>
            <div className="module-spacer--small" />
            <h3>{ cardNumber === "No information" ? 'Resister' : 'Edit' }</h3>

            <div className="module-spacer--small" />
            <CardElement
                className={classes.element}
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: theme.palette.grey["700"],
                            '::placeholder': {
                                color: theme.palette.grey["500"],
                            }
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <div className="module-spacer--medium"/>
            <div>
                <p>
                  This is for test
                </p>
                <p>
                    you can type any number for CVC code、postcode <br/>
                </p>
                <div className="module-spacer--small"/>
                <TextDetail label={"VISA"} value={"4242 4242 4242 4242"} key={"test-visa"}/>
                <TextDetail label={"Master Card"} value={"5555 5555 5555 4444"} key={"test-master-card"}/>
                <TextDetail label={"AMEX"} value={"3782 822463 10005"} key={"test-amex"}/>
                <TextDetail label={"Discover"} value={"6011 1111 1111 1117"} key={"test-discover"}/>
                <TextDetail label={"Diners Club"} value={"3056 9300 0902 0004"} key={"test-diners-club"}/>
            </div>
            <div className="module-spacer--medium"/>
            <div className="center">
                <PrimaryButton
                    label={"Save"}
                    onClick={register}
                />
                <button
                    label={"back to my page"}
                    onClick={goBackToMyPage}
                />
            </div>
        </section>
    );
};

export default PaymentEdit;