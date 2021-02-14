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

const App = ()=> {
  return (
    <Router>
      <Fragment>
        <Header/>
        <main className="py-3">
          <Container>
            <Route path='/login' component={LoginScreen}/>
            <Route path='/register' component={RegisterScreen}/>
            <Route path='/profile' component={ProfileScreen}/>
            <Route path='/product/:id' component={ProductScreen}/>
            <Route path="/cart/:id?" component={CartScreen}/>
            <Route path='/' component={HomeScreen} exact/>
          </Container>
        </main>
        <Footer/>
      </Fragment>
    </Router>
  );
}

export default App;
