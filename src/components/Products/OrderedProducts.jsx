import React, {useCallback} from 'react';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import {makeStyles} from "@material-ui/styles";
import {useDispatch} from "react-redux";
import {push} from "connected-react-router"
import "../../assets/styles/orderedProducts.scss"

const useStyles = makeStyles((theme) => ({
    list: {
        background: '#fff',
        height: 'auto'
    },
    image: {
        objectFit: 'cover',
        margin: '8px 16px 8px 0',
        height: 96,
        width: 96
    },
    text: {
        width: '100%'
    }
}))

const OrderedProducts = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const products = props.products;

    const goToProductPage = useCallback((id) => {
        dispatch(push('/product/'+id))
    }, [])

    return (
        <List>
            {Object.keys(products).map(key => {
                const product = products[key]

                return (
                    <>
                        <ListItem className={classes.list} key={product.id}>
                            <ListItemAvatar>
                                <img className={classes.image} src={product.images[0].path} alt="Product image" />
                            </ListItemAvatar>
                            <div className={classes.text}>
                                <ListItemText primary={product.name} secondary={"Size：" + product.size} />
                                <ListItemText primary={"$"+product.price.toLocaleString()} />
                            </div>
                            <button className="detailButton" onClick={() => goToProductPage(product.id)}>
                            Details
                            </button>
                        </ListItem>
                        <Divider />
                    </>
                )
            })}
        </List>
    );
};

export default OrderedProducts;