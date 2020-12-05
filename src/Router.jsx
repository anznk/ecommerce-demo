import React from 'react';
import {Route, Switch, BrowserRouter} from "react-router-dom";
import {SignUp} from "./templates";

const Router = () => {
    return (
      <BrowserRouter>
      <Switch>
        
            {/* <Route exact path="/signin" component={SignIn} /> */}
            <Route exact path={"/signup"} component={SignUp} />
      </Switch>
      </BrowserRouter>

    );
};

export default Router;