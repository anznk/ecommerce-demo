import {db, FirebaseTimestamp} from '../../firebase/index';
import {push} from "connected-react-router";
import {deleteProductAction, fetchProductsAction} from "./actions"
import {hideLoadingAction, showLoadingAction} from "../loading/actions";

const productsRef = db.collection('products')

export const deleteProduct = (id) => {
	return async (dispatch, getState) => {
		productsRef.doc(id).delete()
			.then(() => {
				const prevProducts = getState().products.list
				const nextProducts = prevProducts.filter(product => product.id !== id)
				dispatch(deleteProductAction(nextProducts))
			})
	}
}

export const fetchProducts = (category) => {

	return async (dispatch) => {

		let query = (category !== "") ? productsRef.where('category', '==', category): productsRef
		
		query.get()
			.then(snapshots => {
			const productList = []
			snapshots.forEach(snapshot => {
				const product = snapshot.data()
				productList.push(product)
			})
			dispatch(fetchProductsAction(productList))
		})
	}
}

export const orderProduct = (productsInCart, price) => {
	return async (dispatch, getState) => {
		dispatch(showLoadingAction("Processing..."));

		const uid = getState().users.uid;
		const userRef = db.collection('users').doc(uid);
		const timestamp = FirebaseTimestamp.now();
		let products = {};
		let soldOutProducts = [];

		const batch = db.batch();

		for (const product of productsInCart) {
			const snapshot = await productsRef.doc(product.productId).get();
			const sizes = snapshot.data().sizes;

			// Create a new array of the product sizes
			const updateSizes = sizes.map(size => {
				if (size.size === product.size) {
					if (size.quantity === 0) {
						soldOutProducts.push(product.name);
						return size
					}
					return {
						size: size.size,
						quantity: size.quantity - 1
					}
				} else {
					return size
				}
			});

			products[product.productId] = {
				id: product.productId,
				images: product.images,
				name: product.name,
				price: product.price,
				size: product.size
			};

			batch.update(
				productsRef.doc(product.productId),
				{sizes: updateSizes}
			);

			batch.delete(
				userRef.collection('cart').doc(product.cartId)
			);
		}

		if (soldOutProducts.length > 0) {
			const errorMessage = (soldOutProducts.length > 1) ? soldOutProducts.join('and') : soldOutProducts[0];
			alert('Sorry' + errorMessage + 'is out of stock');
			return false
		} else {
			batch.commit()
			.then(() => {
				// Create order history data
				const orderRef = userRef.collection('orders').doc();
				const date = timestamp.toDate();

				// Calculate shipping date which is the date after 3 days
				const shippingDate = FirebaseTimestamp.fromDate(new Date(date.setDate(date.getDate() + 3)));

				const history = {
						amount: price,
						created_at: timestamp,
						id: orderRef.id,
						products: products,
						shipping_date: shippingDate,
						updated_at: timestamp
				};

				orderRef.set(history);

				dispatch(hideLoadingAction());
				dispatch(push('/order/complete'))
			}).catch(() => {
				alert('Sorry... Failed to order. Please try again.')
			})
		}
	}
}

export const saveProduct = (id, name, description, category, price, sizes, images) => {
	console.log("sizes",sizes);
	
	return async (dispatch) => {
		const timestamp = FirebaseTimestamp.now();

		const data = {
			category: category,
			description: description,
			images: images,
			name: name,
			price: parseInt(price, 10),
			sizes: sizes,
			updated_at: timestamp
		}

		if (id === "") {
			const ref = productsRef.doc()
			data.created_at = timestamp;
			id = ref.id;
			data.id = id;
		}

		return productsRef.doc(id).set(data, {merge: true})
			.then(() => {
				dispatch(push('/'))
			}).catch((error) => {
				throw new Error(error)
		})
	}
}