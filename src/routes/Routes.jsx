import React from "react";
import {
  Switch,
  Route
} from "react-router-dom";

import ProductsList from '../views/ProductsList'
import Cart from '../components/Cart'

const Routes = () => {
  return (    
        <Switch>
            <Route path="/favorites">
                <ProductsList />
            </Route>
            <Route path="/cart">
                <Cart />
            </Route>
            <Route path="/">
                <ProductsList />
            </Route>
        </Switch>
  );
}

export default Routes;