import React from 'react';
import Divider from "@material-ui/core/Divider";
import {OrderedProducts} from "./index";
import {datetimeToString, dateToString} from "../../function/common";
import {TextDetail} from "../UIkit";
import "../../assets/styles/orderHistoryItem.scss"

const OrderHistoryItem = (props) => {
    const orderedDatetime = datetimeToString(props.order.updated_at.toDate())
    const shippingDate = dateToString(props.order.shipping_date.toDate())
    const totalPrice = "$" + props.order.amount.toLocaleString()
    const products = props.order.products

    return (
        <div>
            <div className="module-spacer--small" />
            <TextDetail label={"ID"} value={props.order.id} />
            <TextDetail label={"Dtate"} value={orderedDatetime} />
            <TextDetail label={"shipping Date"} value={shippingDate} />
            <TextDetail label={"Total Price"} value={totalPrice}/>
            {Object.keys(products).length > 0 && (
                <OrderedProducts products={products} />
            )}
            <div className="module-spacer--extra-extra-small" />
            <Divider />
        </div>
    );
};

export default OrderHistoryItem;