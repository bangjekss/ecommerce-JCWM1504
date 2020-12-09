import React, { Component } from 'react';
import { Input, Button } from 'reactstrap';
import { API_URL } from '../helpers/api-url';
import Axios from 'axios';
import { connect } from 'react-redux';
import { loginAction } from '../redux/action/userAction';
import { Redirect } from 'react-router-dom';
// import {} from '../sprites/';

class LoginPage extends Component {
  state = {
    loginInfo: {
      email: null,
      password: null,
    },
  };

  onChangeForm = (e) => {
    this.setState({
      loginInfo: {
        ...this.state.loginInfo,
        [e.target.id]: e.target.value,
      },
    });
  };

  login = () => {
    const { email, password } = this.state.loginInfo;
    Axios.get(`${API_URL}/users?email=${email}&password=${password}`)
      .then((res) => {
        console.log(res, 'success to load database');
        console.log(res.data[0]);
        if (res.data.length === 0) {
          alert('invalid');
        } else {
          this.props.loginAction(res.data[0]);
          localStorage.setItem('id', res.data[0].id);
        }
      })
      .catch((error) => {
        console.log(error, 'fail to load database');
        alert('fail to load database');
      });
  };

  render() {
    const { email, password } = this.state.loginInfo;
    if (this.props.email !== null) {
      return <Redirect to="/"></Redirect>;
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
          // backgroundImage: {require},
          // backgroundSize: '100% 100%',
          // backgroundPosition: 'center',
          // backgroundRepeat: 'no-repeat',
          // backgroundColor: 'red',
        }}
      >
        <div>Login FORM</div>
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
        <Button onClick={this.login} className="my-2">
          Login
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (gstate) => {
  return {
    email: gstate.user.email,
  };
};

export default connect(mapStateToProps, { loginAction })(LoginPage);
