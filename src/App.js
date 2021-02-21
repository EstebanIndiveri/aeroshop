import React, { Fragment } from 'react';
import {Container} from 'react-bootstrap'
import {HashRouter as Router,Route } from 'react-router-dom'
// components
import Footer from './components/Footer';
import Header from './components/Header';
import CartScreen from './views/CartScreen';
import HomeScreen from './views/HomeScreen';
import LoginScreen from './views/LoginScreen';
import ProductScreen from './views/ProductScreen';
import RegisterScreen from './views/RegisterScreen';
import ProfileScreen from './views/ProfileScreen';
import ShippingScreen from './views/ShippingScreen';
import PaymentScreen from './views/PaymentScreen';
import PlaceOrderScreen from './views/PlaceOrderScreen';
import OrderScreen from './views/OrderScreen';
import UserListScreen from './views/UserListScreen';
import UserEditScreen from './views/UserEditScreen';
import ProductListScreen from './views/ProductListScreen';
import ProductEditScreen from './views/ProductEditScreen';

const App = ()=> {
  return (
    <Router>
      <Fragment>
        <Header/>
        <main className="py-3">
          <Container>
            <Route path='/order/:id' component={OrderScreen}/>
            <Route path='/shipping' component={ShippingScreen}/>
            <Route path='/payment' component={PaymentScreen}/>
            <Route path='/placeorder' component={PlaceOrderScreen}/>
            <Route path='/login' component={LoginScreen}/>
            <Route path='/register' component={RegisterScreen}/>
            <Route path='/profile' component={ProfileScreen}/>
            <Route path='/product/:id' component={ProductScreen}/>
            <Route path="/cart/:id?" component={CartScreen}/>
            <Route path="/admin/userlist" component={UserListScreen}/>
            <Route path="/admin/user/:id/edit" component={UserEditScreen}/>
            <Route path="/admin/productlist" component={ProductListScreen}/>
            <Route path="/admin/product/:id/edit" component={ProductEditScreen}/>
            <Route path='/' component={HomeScreen} exact/>
          </Container>
        </main>
        <Footer/>
      </Fragment>
    </Router>
  );
}

export default App;
