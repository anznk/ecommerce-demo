import React, {useCallback, useMemo} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getProductsInCart} from "../reducks/users/selectors";
import List from "@material-ui/core/List";
import {CartListItem} from "../components/Products";
import {push} from "connected-react-router"
import "../styles/cartList.scss"

const CartList = () => {
	const dispatch = useDispatch();
	const selector = useSelector(state => state);
	const productsInCart = getProductsInCart(selector);

	const subtotal = useMemo(() => {
		return productsInCart.reduce((sum, product) => sum += product.price, 0)
	},[productsInCart])

	const goToOrder = useCallback(() => {
			dispatch(push('/order/confirm'))
	}, []);

	const backToTop = useCallback(() => {
			dispatch(push('/'))
	}, []);

	return (
		<section class="cartSection">
			<h2 class="pageTitle bd-bottom">Cart</h2>
			<List className="root">
					{productsInCart.length > 0 && (
							productsInCart.map(product => <CartListItem product={product} key={product.cartId} />)
					)}
			</List>
			<div className="total">Total: ${subtotal.toLocaleString()}</div>
			<div className="buttonArea">
				<button className="button buckButton" onClick={backToTop} >continue to shopping</button>
				<button className="button buyButton" onClick={goToOrder} >Proceed to checkout</button>
			</div>
		</section>
	);
};

export default CartList;