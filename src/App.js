import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { NavigationBar } from './components';
import { LandingPage, LoginPage } from './pages';
import RegisterPage from './pages/RegisterPage';

class App extends Component {
  state = {};
  render() {
    return (
      <div>
        <NavigationBar></NavigationBar>
        <Route path="/" exact component={LandingPage}></Route>
        <Route path="/login" component={LoginPage}></Route>
        <Route path="/register" component={RegisterPage}></Route>
        {/* <Route path="/register" component={RegisterPage}></Route> */}
      </div>
    );
  }
}

export default App;
