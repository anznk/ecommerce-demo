import React, {useCallback} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getProductsInCart} from "../reducks/users/selectors";
import List from "@material-ui/core/List";
import {makeStyles} from "@material-ui/core/styles";
import {CartListItem} from "../components/Products";
import {PrimaryButton, GreyButton} from "../components/UIkit";
import {push} from "connected-react-router"
import "../styles/cartList.scss"

const useStyles = makeStyles((theme) => ({
    root: {
        margin: '0 auto',
        maxWidth: 512,
        width: '100%'
    },
}));

const CartList = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selector = useSelector(state => state);
    const productsInCart = getProductsInCart(selector);

    const goToOrder = useCallback(() => {
        dispatch(push('/order/confirm'))
    }, []);

    const backToTop = useCallback(() => {
        dispatch(push('/'))
    }, []);

    return (
        <section >
            <h2>Cart</h2>
            <List className={classes.root}>
                {productsInCart.length > 0 && (
                    productsInCart.map(product => <CartListItem product={product} key={product.cartId} />)
                )}
            </List>
            <div className="module-spacer--medium" />
            <div className="p-grid__column">
                <button 
									style={{
										border: "2px solid #000",
										marginTop: "5rem",
										cursor: "pointer",
										padding:"1rem 3rem",
										background:"#FFF"
									}}
                onClick={goToOrder} >Proceed to checkout</button>
                <div className="module-spacer--extra-extra-small"/>
                <button label={"continue to shopping"} onClick={backToTop} />
            </div>
        </section>
    );
};

export default CartList;