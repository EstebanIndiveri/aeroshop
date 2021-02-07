import React, { Fragment } from 'react';
import {Container} from 'react-bootstrap'
// components
import Footer from './components/Footer';
import Header from './components/Header';
import HomeScreen from './views/HomeScreen';

const App = ()=> {
  return (
    <Fragment>
      <Header/>
      <main className="py-3">
        <Container>
          <HomeScreen/>
        </Container>
      </main>
      <Footer/>
    </Fragment>
  );
}

export default App;
