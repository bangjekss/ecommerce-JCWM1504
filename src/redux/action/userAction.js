import { API_URL } from '../../helpers/api-url';
import Axios from 'axios';

const loginAction = (data) => {
  return {
    type: 'LOGIN',
    payload: data,
  };
};
const registerAction = (data) => {
  return {
    type: 'REGISTER',
    payload: data,
  };
};
const keepLogin = (id) => {
  return (dispatch) => {
    //jika pakai query '?' data yang ditampilkan dalam bentuk arrays
    //jika pakai slash '/' data yang ditampilkakn dalam bentuk objek
    Axios.get(`${API_URL}/users/${id}`)
      .then((response) => {
        console.log(response, 'GET_SUCCESS TO LOAD DATABASE');
        dispatch({
          type: 'LOGIN',
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log(error, 'GET_FAIL TO LOAD DATABASE');
      });
  };
};
const logoutAction = () => {
  return (dispatch) => {
    localStorage.removeItem('id');
    dispatch({
      type: 'LOGOUT',
    });
  };
};

export { loginAction, registerAction, keepLogin, logoutAction };
