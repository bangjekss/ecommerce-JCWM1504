import React, { Component } from 'react';
import queryString from 'querystring';
import { connect } from 'react-redux';
import { fetchProductByIdAction } from '../redux/action';

class ProductDetail extends Component {
  state = {
    data: {},
  };
  componentDidMount() {
    const { fetchProductByIdAction } = this.props;
    const productID = queryString.parse(this.props.location.search)['?id'];
    fetchProductByIdAction(productID);
  }
  render() {
    return (
      <div>
        <div>{this.state.data.name}</div>
        <div>{this.state.data.price}</div>
        <div>{this.state.data.image}</div>
      </div>
    );
  }
}

export default connect(null, { fetchProductByIdAction })(ProductDetail);
