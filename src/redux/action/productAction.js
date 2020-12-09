import Axios from 'axios';
import { API_URL } from '../../helpers/api-url';

const fetchCategoriesAction = () => {
  return (dispatch) => {
    Axios.get(`${API_URL}/categories`)
      .then((response) => {
        console.log(response, 'FETCH_DATA_SUCCESS');
        dispatch({
          type: 'FETCH_CATEGORIES',
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log(error, 'FETCH_DATA_FAIL');
      });
  };
};

const fetchProductsAction = () => {
  return (dispatch) => {
    Axios.get(`${API_URL}/products`)
      .then((response) => {
        console.log(response, 'FETCH_DATA_SUCCESS');
        dispatch({
          type: 'FETCH_PRODUCTS',
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log(error, 'FETCH_DATA_FAIL');
      });
  };
};
const fetchProductByIdAction = (id) => {
  return (dispatch) => {
    Axios.get(`${API_URL}/products/${id}`)
      .then((res) => {
        dispatch({
          type: 'FETCH_BY_ID',
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
const getProductByCategory = (selectedCategory) => {
  return (dispatch) => {
    Axios.get(`${API_URL}/products?${selectedCategory}`)
      .then((response) => {
        console.log(response, 'SUCCESS_GET_DATA');
        dispatch({
          type: 'GET_PRODUCTS_BY_CATEGORY',
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log(error, 'FAIL_GET_DATA');
      });
  };
};

export { fetchCategoriesAction, fetchProductsAction, fetchProductByIdAction, getProductByCategory };
