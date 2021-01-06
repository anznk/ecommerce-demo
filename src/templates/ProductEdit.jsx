import React, {useCallback, useEffect, useState} from 'react';
import {db} from '../firebase/index'
import {PrimaryButton, SelectBox, TextInput} from "../components/UIkit";
import {useDispatch} from "react-redux";
import {saveProduct} from "../reducks/products/operations";
import {ImageArea, SetSizesArea} from "../components/Products";

const ProductEdit = () => {
    const dispatch = useDispatch();
    let id = window.location.pathname.split('/product/edit')[1];
    if (id !== "") {
        id = id.split('/')[1]
    }

    // const genders = [
    //     {id: "all", name: "すべて"},
    //     {id: "male", name: "メンズ"},
    //     {id: "female", name: "レディース"}
    // ];

    const [names, setNames] = useState(""),
          [description, setDescription] = useState(""),
          [images, setImages] = useState([]),
          [category, setCategory] = useState(""),
          [categories, setCategories] = useState([]),
          [gender, setGender] = useState(""),
          [price, setPrice] = useState(""),
          [sizes, setSizes] = useState([]);

    const inputName = useCallback((event) => {
        setNames(event.target.value)
    }, [setNames])

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
                setNames(product.name)
                setDescription(product.description)
                setImages(product.images)
                setCategory(product.category)
                setGender(product.gender)
                setPrice(product.price)
                setSizes(product.sizes)
            })
        }
    },[id])

    useEffect(() => {
        db.collection('categories').orderBy("order", "asc").get().then(snapshots => {
            const list = []
            snapshots.forEach(snapshot => {
                list.push(snapshot.data())
            })
            setCategories(list)
        });
    },[])

    return (
        <section>

            <h2 className="u-text__headline u-text-center">Edit products</h2>
            <div className="c-section-container">
                <ImageArea images={images} setImages={setImages} />

            {names &&
                <TextInput
                    fullWidth={true} label={"Name"} multiline={false} required={true}
                    onChange={inputName} rows={1} value={names} type={"text"}
                />
            }
            {description &&
                <TextInput
                    fullWidth={true} label={"detail"} multiline={true} required={true}
                    onChange={inputDescription} rows={5} value={description} type={"text"}
                />
            }
            {category &&
                <SelectBox
                    label={"Category"} options={categories} required={true} select={setCategory} value={category}
                />
            }
                {/* <SelectBox
                    label={"Gender"} options={genders} required={true} select={setGender} value={gender}
                /> */}
            {price &&
                <TextInput
                    fullWidth={true} label={"Price"} multiline={false} required={true}
                    onChange={inputPrice} rows={1} value={price} type={"number"}
                />
            }
                <div className="module-spacer--small"/>
                <SetSizesArea sizes={sizes} setSizes={setSizes} />
                <div className="module-spacer--small" />
                <div className="center">
                    <PrimaryButton
                        label={"Save"}
                        onClick={() => dispatch(saveProduct(id, names, description, category, gender, price, sizes, images))}
                    />
                </div>
            </div>
        </section>
    );
};

export default ProductEdit;