import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCategoriesAction, fetchProductsAction, getProductByCategory } from '../redux/action';
import Select from 'react-select';
import { ProductCard } from '../components';
import { Link } from 'react-router-dom';

class ProductPage extends Component {
  state = {
    selectedCategory: null,
  };
  componentDidMount() {
    const { fetchCategoriesAction, fetchProductsAction } = this.props;
    fetchCategoriesAction();
    fetchProductsAction();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedCategory !== this.state.selectedCategory) {
      const { getProductByCategory } = this.props;
      const { selectedCategory } = this.state;
      getProductByCategory(selectedCategory);
    }
  }
  handleCategoryFilter = (e) => {
    if (e.value === 0) {
      this.setState({
        selectedCategory: '',
      });
    } else {
      this.setState({
        selectedCategory: `categoryID=${e.value}`,
      });
    }
  };

  renderCategoryList = () => {
    const arrItem = this.props.categories.map((value, index) => {
      return { value: index, label: value.category };
    });
    return <Select options={arrItem} onChange={this.handleCategoryFilter}></Select>;
  };
  renderProductList = () => {
    return this.props.productList.map((value) => {
      return (
        <div className="m-2">
          <Link to={`/product-detail?id=${value.id}`}>
            <ProductCard image={value.image} name={value.name} price={value.price}></ProductCard>
          </Link>
        </div>
      );
    });
  };

  render() {
    console.log(this.props.productList);
    return (
      <div className="row">
        <div className="col-3">
          <div>
            <h5>Categories</h5>
          </div>
          <div id="productsCategory">{this.renderCategoryList()}</div>
        </div>
        <div className="col-9" style={{ display: 'flex', flexWrap: 'wrap' }} id="renderProductList">
          {this.renderProductList()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ products }) => {
  return {
    categories: products.categories,
    productList: products.productList,
  };
};

export default connect(mapStateToProps, {
  fetchCategoriesAction,
  fetchProductsAction,
  getProductByCategory,
})(ProductPage);
