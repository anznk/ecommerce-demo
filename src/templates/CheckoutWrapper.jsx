import React from 'react';
import {loadStripe} from "@stripe/stripe-js/pure";
import {Elements} from "@stripe/react-stripe-js";
import {PaymentEdit} from "../components/Payment";

const STRIPE_PUBLIC_KEY = "pk_test_51I92u2A9KooaP4x92scgdj50WBROa9tb2UkC2AAAVVJQAodTXbGvpSkDaTYqfIygKRSNlbIlFdgERjNGCgpkPhda00FsyfrQ6b";
const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

const CheckoutWrapper = () => {
    return (
        <Elements stripe={stripePromise}>
            <PaymentEdit />
        </Elements>
    );
};

export default CheckoutWrapper;