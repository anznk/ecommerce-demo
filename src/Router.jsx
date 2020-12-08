import React from 'react';
import {Route, Switch, BrowserRouter} from "react-router-dom";
import {SignUp, ProductList} from "./templates";
import Auth from "./Auth";

const Router = () => {
    return (
      
      <Switch>
        
            {/* <Route exact path="/signin" component={SignIn} /> */}
            <Route exact path={"/signup"} component={SignUp} />
            <Auth>
              <Route exact path="(/)?" component={ProductList} />
              
            </Auth>
      </Switch>
      

    );
};

export default Router;