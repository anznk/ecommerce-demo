import React, {useCallback, useEffect, useState} from 'react';
// import ImageSwiper from "../components/Products/ImageSwiper";
// import {makeStyles} from "@material-ui/styles";
import {useDispatch, useSelector} from "react-redux";
import {db, FirebaseTimestamp} from "../firebase";
import {SizeTable, ImageSwiper} from "../components/Products";
import {addProductToCart} from "../reducks/users/operations";
import {returnCodeToBr} from "../function/common";
import "../assets/styles/productDetail.scss"

const ProductDetail = () => {
    const dispatch = useDispatch()
    const selector = useSelector(state => state)
    const path = selector.router.location.pathname
    const id = path.split('/product/')[1]

    const [product, setProduct] = useState(null);
    const [selectedSize, setSelectedSize] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        db.collection('products').doc(id).get().then(doc => {
            const data = doc.data()
            setProduct(data)
        })
    },[])

    const addProduct = useCallback((size) => { 
      if(!size){
        setErrorMessage("Please select size.");
        return;
      }
      const timestamp = FirebaseTimestamp.now()
      dispatch(addProductToCart({
        added_at: timestamp,
        description: product.description,
        images: product.images,
        name: product.name,
        price: product.price,
        productId: product.id,
        quantity: 1,
        size: size
      }))
    }, [product])
    const addSize = useCallback((size) => {
        setSelectedSize(size);
    }, [product])

    return (
			<section className="c-section-wrapin">
				{product && (
					<div className="p-grid__row">
						<div className="sliderBox">
							<ImageSwiper images={product.images}/>
						</div>
						<div className="detail">
							<h2 className="title">{product.name}</h2>
              {/* <div className="module-spacer--small"/> */}
							<p className="price">${(product.price).toLocaleString()}</p>
							{/* <div className="module-spacer--small"/> */}
              <div className="description">
							<p>{returnCodeToBr(product.description)}</p>
              </div>
							<div className="module-spacer--small"/>
              <div className="size">
							<p>Size</p>
              </div>
							<SizeTable addSize={addSize} sizes={product.sizes} />  
              <p className="errorMessage">{errorMessage}</p>
							<button className="AddCart"
								onClick={() => addProduct(selectedSize)}> Add cart 
							</button>
						</div>
					</div>
				)}
			</section>
    );
};

export default ProductDetail;