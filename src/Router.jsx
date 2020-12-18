import React from 'react';
import {Route, Switch} from "react-router-dom";
import {SignIn, SignUp, ProductList, ProductDetail, ProductEdit, CartList, OrderConfirm, MyPage} from "./templates";
import Auth from "./Auth";

const Router = () => {
    return (
      <Switch>
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        <Auth>
          <Route exact path="(/)?" component={ProductList} />
          <Route exact path="/product/:id" component={ProductDetail} />
          <Route path="/product/edit(/:id)?" component={ProductEdit} />

          <Route exact path="/cart" component={CartList} />
          <Route exact path="/order/confirm" component={OrderConfirm} />

          <Route exact path="/user/mypage" component={MyPage} />
        </Auth>
      </Switch>
    );
};

export default Router;