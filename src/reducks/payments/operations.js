import {showLoadingAction, hideLoadingAction} from "../loading/actions";
import {CardElement} from "@stripe/react-stripe-js";
import {db} from '../../firebase/index';
import {push} from "connected-react-router";
import {updateUserStateAction} from "../users/actions";

// Set Header
const headers = new Headers();
require('dotenv').config();
headers.set('Content-type', 'application/json');
const BASE_URL = process.env.REACT_APP_BASE_URL;

const createCustomer = async (email, paymentMethodId, uid, username) => {


    const response = await fetch(BASE_URL + '/v1/customer', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            email: email,
            paymentMethod: paymentMethodId,
            userId: uid,
            username: username
        })
    });

    const customerResponse = await response.json();
    console.log("customerResponse",customerResponse);
    return JSON.parse(customerResponse.body);
}

export const registerCard = (stripe, elements, customerId) => {
    return async (dispatch, getState) => {
        const user = getState().users;
        const email = user.email;
        const uid = user.uid;
        const username = user.username;

        dispatch(showLoadingAction("登録中..."));
        //*********************** START VALIDATION **************************//
        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            console.error("Does not exist stripe or elements");
            dispatch(hideLoadingAction());
            return;
        }

        // Get a reference to a mounted CardInputForm.
        const cardElement = elements.getElement(CardElement);
        if (!cardElement) {
            console.error("Does not exist cardElement");
            dispatch(hideLoadingAction());
            return;
        }

        // Use your card Element with other Stripe.js APIs
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            dispatch(hideLoadingAction());
            alert(error.message);
            return;
        }

        const paymentMethodId = paymentMethod?.id;
    console.log("paymentMethodId",paymentMethodId);
        // Create customer on Stripe
        if (customerId === "") {
        
            const customerData = await createCustomer(email, paymentMethodId, uid, username);
            console.log("cus",customerData);
            if (!customerData.id) {
                dispatch(hideLoadingAction());
                alert('Failed registration');
            } else {
                const updateUserState = {
                    customer_id: customerData.id,
                    payment_method_id: paymentMethodId
                }
                db.collection('users').doc(uid)
                    .update(updateUserState)
                    .then(() => {
                        dispatch(updateUserStateAction(updateUserState))
                        dispatch(hideLoadingAction());
                        alert('Failed to register');
                        dispatch(push('/user/mypage'))
                    }).catch(async (error) => {
                        console.error(error);
                        // Delete customer data from stripe
                        const deleteCustomer = await fetch(BASE_URL + '/v1/customer', {
                            method: 'DELETE',
                            headers: headers,
                            body: JSON.stringify({customerId: customerData.id})
                        });
                        await deleteCustomer.json();
                        dispatch(hideLoadingAction());
                        alert('Failed registration');
                    })
            }
        } else {
            const prevPaymentMethodId = getState().users.payment_method_id;
            const updatedPaymentMethod = await updatePaymentMethod(customerId, prevPaymentMethodId, paymentMethodId);

            if (!updatedPaymentMethod) {
                dispatch(hideLoadingAction());
                alert('Failed registration');
            } else {
                const updateUserState = {payment_method_id: paymentMethodId}
                db.collection('users').doc(uid)
                    .update(updateUserState)
                    .then(() => {
                        dispatch(updateUserStateAction(updateUserState));
                        dispatch(hideLoadingAction());
                        alert('Failed registration');
                        dispatch(push('/user/mypage'))
                    }).catch(() => {
                        dispatch(hideLoadingAction());
                        alert('Failed registration');
                    })
            }
        }
    }
};

export const retrievePaymentMethod = async (paymentMethodId) => {

    const response = await fetch(BASE_URL + '/retrievePaymentMethod/v1/paymentMethod', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            paymentMethodId: paymentMethodId
        })
    });
    // console.log("response", response);

    const cardResponse = await response.json();
    console.log("cardResponse", cardResponse);
    
    const paymentMethod = JSON.parse(cardResponse.body);
    return paymentMethod.card
}

export const updatePaymentMethod = async (customerId, prevPaymentMethodId, nextPaymentMethodId) => {
    const response = await fetch(BASE_URL + '/v1/updatePaymentMethod', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            customerId: customerId,
            prevPaymentMethodId: prevPaymentMethodId,
            nextPaymentMethodId: nextPaymentMethodId,
        })
    });

    const paymentMethodResponse = await response.json();
    const paymentMethod = JSON.parse(paymentMethodResponse.body);
    return paymentMethod.card
}

export const paymentIntent = async (amount, customerId, paymentMethodId) => {
    
    const response = await fetch(BASE_URL + '/paymentIntent', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            amount: amount,
            customerId: customerId,
            paymentMethodId: paymentMethodId
        })
    });
    // console.log("response", response);

    const cardResponse = await response.json();
    console.log("cardResponse", cardResponse);
    
    const paymentMethod = JSON.parse(cardResponse.body);
    return paymentMethod.card
}