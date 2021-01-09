import React, {useCallback, useEffect, useState} from 'react';
import {db} from '../firebase/index'
import {PrimaryButton, SelectBox, TextInput} from "../components/UIkit";
import {useDispatch} from "react-redux";
import {saveProduct} from "../reducks/products/operations";
import {ImageArea, SetSizesArea} from "../components/Products";

const ProductAdd = () => {
    const dispatch = useDispatch();
    let id = window.location.pathname.split('/product/add')[1];
    if (id !== "") {
        id = id.split('/')[1]
    }

    const [name, setName] = useState(""),
          [description, setDescription] = useState(""),
          [images, setImages] = useState([]),
          [category, setCategory] = useState(""),
          [categories, setCategories] = useState([]),
          [price, setPrice] = useState(""),
          [sizes, setSizes] = useState([]);

    const inputName = useCallback((event) => {
        setName(event.target.value)
    }, [setName])

    const inputDescription = useCallback((event) => {
        setDescription(event.target.value)
    }, [setDescription])

    const inputPrice = useCallback((event) => {
        setPrice(event.target.value)
    }, [setPrice])

    useEffect(() => {
        if (id !== "") {
            db.collection('products').doc(id).get().then(snapshot => {
                const product = snapshot.data()
                setName(product.name)
                setDescription(product.description)
                setImages(product.images)
                setPrice(product.price)
                setSizes(product.sizes)
            })
        }
    },[id])

    useEffect(() => {
        // db.collection('categories').orderBy("order", "asc").get().then(snapshots => {
        //     const list = []
        //     snapshots.forEach(snapshot => {
        //         list.push(snapshot.data())
        //     })
        //     setCategories(list)
        // });
    },[])

    return (
        <section>

            <h2 className="u-text__headline u-text-center">Add products</h2>
            <div className="c-section-container">
            
                <ImageArea images={images} setImages={setImages} />
            
            
                <TextInput
                    fullWidth={true} label={"Name"} multiline={false} required={true}
                    onChange={inputName} rows={1} value={name} type={"text"}
                />
            
            
                <TextInput
                    fullWidth={true} label={"detail"} multiline={true} required={true}
                    onChange={inputDescription} rows={5} value={description} type={"text"}
                />
            
            
                <SelectBox
                    label={"Category"} options={categories} required={true} select={setCategory} value={category}
                />
            
            
                <TextInput
                    fullWidth={true} label={"Price"} multiline={false} required={true}
                    onChange={inputPrice} rows={1} value={price} type={"number"}
                />
            
                <div className="module-spacer--small"/>
                <SetSizesArea sizes={sizes} setSizes={setSizes} />
                <div className="module-spacer--small" />
                <div className="center">
                    <PrimaryButton
                        label={"Save"}
                        onClick={() => dispatch(saveProduct(id, name, description, category, price, sizes, images))}
                    />
                </div>
            </div>
        </section>
    );
};

export default ProductAdd;