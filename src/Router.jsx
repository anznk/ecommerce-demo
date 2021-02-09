import React from 'react';
import {Route, Switch} from "react-router-dom";
import {SignIn, SignUp, ProductList, ProductDetail, ProductEdit, ProductAdd, CartList, OrderConfirm, OrderComplete, OrderHistory, MyPage, CheckoutWrapper} from "./templates";
import Auth from "./Auth";
import "./styles/index.scss"

const Router = () => {
    return (
      <Switch>
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        <Auth>
          <Route exact path="(/)?" component={ProductList} />
          <Route exact path="/product/:id" component={ProductDetail} />
          <Route path="/product/edit(/:id)?" component={ProductEdit} />
          <Route path="/product/add(/:id)?" component={ProductAdd} />

          <Route exact path="/cart" component={CartList} />
          <Route exact path="/order/confirm" component={OrderConfirm} />
          <Route exact path="/order/complete" component={OrderComplete} />
          <Route exact path="/order/history" component={OrderHistory} />

          <Route exact path="/user/mypage" component={MyPage} />
          <Route exact path="/user/payment/edit" component={CheckoutWrapper} />
        </Auth>
      </Switch>
    );
};

export default Router;