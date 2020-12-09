import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { NavigationBar } from './components';
import { LandingPage, LoginPage, ProductPage, RegisterPage, ProductDetail } from './pages';
// import RegisterPage from './pages/RegisterPage';
import { keepLogin } from './redux/action';
import { connect } from 'react-redux';

class App extends Component {
  state = {};

  componentDidMount() {
    const id = localStorage.getItem('id');
    if (id) {
      this.props.keepLogin(id);
    }
  }

  render() {
    return (
      <div>
        <NavigationBar></NavigationBar>
        <Route path="/" exact component={LandingPage}></Route>
        <Route path="/login" component={LoginPage}></Route>
        <Route path="/register" component={RegisterPage}></Route>
        <Route path="/products" component={ProductPage}></Route>
        <Route path="/product-detail" component={ProductDetail}></Route>
      </div>
    );
  }
}

const mapStateToProps = (state) => {};

export default connect(mapStateToProps, { keepLogin })(App);
