import React, { useEffect } from 'react'
import Header from './components/Header';
import logo from './logo.svg';
import { Route, Switch } from "react-router-dom";
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import './App.scss';
import CartPage from './pages/CartPage';
import HomePage from './pages/HomePage';

import './utils/axios';
import { useDispatch } from 'react-redux';
import { listCart } from './store/slices/cartSlice';

library.add(fas);

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listCart());
    return () => {
      
    }
  }, [])
  return (
    <>
      <Header />
      <main role="main">
        <div className="container">
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/cart" component={CartPage} />
          </Switch>
        </div>
      </main>
    </>
  
  );
}

export default App;
