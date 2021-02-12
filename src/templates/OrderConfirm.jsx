import React, {useCallback, useMemo, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getProductsInCart} from "../reducks/users/selectors";
import {makeStyles} from "@material-ui/core/styles";
import {CartListItem} from "../components/Products";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import {PrimaryButton, TextDetail} from "../components/UIkit";
import {orderProduct} from "../reducks/products/operations";
import {PaymentEdit} from "../components/Payment";
import {loadStripe} from "@stripe/stripe-js/pure";
import {Elements} from "@stripe/react-stripe-js";
import {hideLoadingAction, showLoadingAction} from "../reducks/loading/actions";
import {retrievePaymentMethod, paymentIntent} from "../reducks/payments/operations";
import {getCustomerId, getPaymentMethodId} from "../reducks/users/selectors";
import "../styles/orderConfirm.scss"

require('dotenv').config();
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);



const OrderConfirm = () => {

    const dispatch = useDispatch();
    const selector = useSelector(state => state);
    const productsInCart = getProductsInCart(selector);
    const [card, setCard] = useState({});
    const paymentMethodId = getPaymentMethodId(selector);
    const customerId = getCustomerId(selector);

    const subtotal = useMemo(() => {
        return productsInCart.reduce((sum, product) => sum += product.price, 0)
    },[productsInCart])

    const shippingFee = useMemo(() => (subtotal >= 1000) ? 0 : 15,[subtotal])
    const tax = useMemo(() => (subtotal + shippingFee) * 0.12, [subtotal, shippingFee])
    const total = useMemo(() => subtotal + shippingFee + tax,[subtotal,shippingFee,tax])

    const order = useCallback(async() => {
        await paymentIntent(total, customerId, paymentMethodId)
        dispatch(orderProduct(productsInCart, total))
    }, [productsInCart])
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
			<section className="confirmSection">
				<div className="leftSection">
					<h2>Comfirm your order</h2>
					<div className="detailBox">
							<List>
									{productsInCart.length > 0 && (
											productsInCart.map(product => <CartListItem product={product} key={product.cartId} />)
									)}
							</List>
					</div>
					<div className="payment">
						<h2>Payment</h2>
						<div className="paymentMethod">
						{ card ? 
							<TextDetail label={card.brand} value={cardNumber} key={card.id}/>
								: <Elements stripe={stripePromise}>
										<PaymentEdit />
									</Elements>
							}
						</div>
					</div>
					<div className="buttonArea">
						<button className="confirmedButton" onClick={order}> Confirmed your order </button>
					</div>
				</div>
				<div className="rightSection" >
					<div className="orderBox">
						<TextDetail label={"Total"} value={"$"+subtotal.toLocaleString()} />
						<TextDetail label={"Shipping Fee"} value={"$"+shippingFee.toLocaleString()} />
						<TextDetail label={"Tax"} value={"$"+tax.toLocaleString()} />
						<Divider />
						<div className="module-spacer--extra-extra-small" />
						<TextDetail label={"Total (including Tax)"} value={"$"+total.toLocaleString()} />
						
						{/* <PrimaryButton label={"Confirmed your order"} onClick={order} /> */}
					</div>
				</div>
			</section>
    );
};

export default OrderConfirm;