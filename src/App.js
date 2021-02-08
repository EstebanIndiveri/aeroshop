import React, { Fragment } from 'react';
import {Container} from 'react-bootstrap'
import {HashRouter as Router,Route } from 'react-router-dom'
// components
import Footer from './components/Footer';
import Header from './components/Header';
import HomeScreen from './views/HomeScreen';
import ProductScreen from './views/ProductScreen';

const App = ()=> {
  return (
    <Router>
      <Fragment>
        <Header/>
        <main className="py-3">
          <Container>
            <Route path='/' component={HomeScreen} exact/>
            <Route path='/product/:id' component={ProductScreen}/>

          </Container>
        </main>
        <Footer/>
      </Fragment>
    </Router>
  );
}

export default App;
