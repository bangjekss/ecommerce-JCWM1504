import React, { Component } from 'react';
import { Input, Button } from 'reactstrap';
import { API_URL } from '../helpers/api-url';
import Axios from 'axios';
import { connect } from 'react-redux';
import { registerAction } from '../redux/action/userAction';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';

class RegisterPage extends Component {
  state = {
    registerInfo: {
      username: null,
      email: null,
      password: null,
      confirmPassword: null,
    },
    isLoading: true,
    finsih: false,
  };

  onChangeForm = (e) => {
    this.setState({
      registerInfo: {
        ...this.state.registerInfo,
        [e.target.id]: e.target.value,
      },
    });
  };

  register = () => {
    const { username, email, password, confirmPassword } = this.state.registerInfo;
    if (!username || !email || !password || !confirmPassword) {
      document.querySelectorAll('#username')[0].value = '';
      document.querySelectorAll('#email')[0].value = '';
      document.querySelectorAll('#password')[0].value = '';
      document.querySelectorAll('#confirmPassword')[0].value = '';
      return alert('Complete the form!!');
    } else {
      if (password !== confirmPassword) {
        document.querySelectorAll('#password')[0].value = '';
        document.querySelectorAll('#confirmPassword')[0].value = '';
        return alert('Confirm Password does not match!!');
      } else {
        Axios.get(`${API_URL}/users?email=${email}`)
          .then((response) => {
            console.log(response, 'GET - Success to Load Database');
            console.log(response.data[0]);
            if (response.data.length !== 0) {
              document.querySelectorAll('#password')[0].value = '';
              document.querySelectorAll('#confirmPassword')[0].value = '';
              return alert('Email already used!!');
            } else {
              console.log('Email can be used');
              // this.props.registerAction({ email, password });
              Axios.post(`${API_URL}/users`, {
                username,
                email,
                password,
              })
                .then((res) => {
                  console.log(res, 'POST - Success to Load Database');
                  this.setState({
                    finsih: true,
                  });
                })
                .catch((err) => {
                  console.log(err, 'POST - Fail to Load Database');
                });
            }
          })
          .catch((err) => {
            console.log(err, 'GET - Fail to Load Database');
          });
      }
    }
  };

  render() {
    const { username, email, password, confirmPassword } = this.state.registerInfo;
    if (this.state.finsih) {
      return <Redirect to="/login"></Redirect>;
    }
    return (
      <div
        id="bgForm"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          height: '100vh',
        }}
      >
        <div className="formContainer">
          <div
            className="d-flex justify-content-center p-3 mt-2"
            style={{ borderBottom: '1px solid rgba(0,0,0,0.2)', color: 'white' }}
          >
            <h4>CREATE YOUR ACCOUNT</h4>
          </div>
          <div className="d-flex py-3" style={{ flexDirection: 'column', padding: '0 75px' }}>
            <div className="my-2">
              <Input
                type="text"
                placeholder="username"
                id="username"
                onChange={this.onChangeForm}
                value={username}
              ></Input>
            </div>
            <div className="my-2">
              <Input
                type="email"
                placeholder="ex@email.com"
                id="email"
                onChange={this.onChangeForm}
                value={email}
              ></Input>
            </div>
            <div className="my-2">
              <Input
                type="password"
                placeholder="password"
                id="password"
                onChange={this.onChangeForm}
                value={password}
              ></Input>
            </div>
            <div className="my-2">
              <Input
                type="password"
                placeholder="confirm password"
                id="confirmPassword"
                onChange={this.onChangeForm}
                value={confirmPassword}
              ></Input>
            </div>
            <div
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}
              className="my-2"
            >
              <Link to="/login">
                <div>Have an account? Sign in here</div>
              </Link>
              <Button
                style={{ borderRadius: '30px' }}
                onClick={this.register}
                color="primary"
                className="px-3 py-2"
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (gstate) => {
  return {
    email: gstate.user.email,
  };
};

export default connect(mapStateToProps, { registerAction })(RegisterPage);
