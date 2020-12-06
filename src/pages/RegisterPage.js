import React, { Component } from 'react';
import { Input, Button } from 'reactstrap';
import { API_URL } from '../helpers/api-url';
import Axios from 'axios';
import { connect } from 'react-redux';
import { registerAction } from '../redux/action/userAction';
import { Redirect } from 'react-router-dom';

class RegisterPage extends Component {
  state = {
    registerInfo: {
      email: null,
      password: null,
      confirmPassword: null,
    },
    usersDatabase: null,
    isEmailAlreadyUsed: false,
    mailCek: () => this.checkMail(this.state.registerInfo.email),
    finsih: false,
  };

  // componentDidUpdate(prevState) {

  // }

  onChangeForm = (e) => {
    this.setState({
      registerInfo: {
        ...this.state.registerInfo,
        [e.target.id]: e.target.value,
      },
      checkMail: () => this.checkMail(this.state.registerInfo.email),
    });
  };

  checkMail = (mail) => {
    const check = this.state.usersDatabase.find((value) => value.email === mail);
    return check;
  };

  register = () => {
    const { email, password, confirmPassword } = this.state.registerInfo;
    if (!email || !password || !confirmPassword) {
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
        Axios.get(`${API_URL}/users`)
          .then((response) => {
            console.log(response, 'GET - Success to Load Database');
            this.setState({
              usersDatabase: response.data,
              isEmailAlreadyUsed: this.state.mailCek ? true : false,
            });
            console.log(this.state.usersDatabase);
            console.log(this.state.mailCek);
            console.log(this.state.isEmailAlreadyUsed);
            // if (this.state.isEmailAlreadyUsed) {
            //   document.querySelectorAll('#email')[0].value = '';
            //   document.querySelectorAll('#password')[0].value = '';
            //   document.querySelectorAll('#confirmPassword')[0].value = '';
            //   return alert('Email already used!!');
            // }
          })
          .catch((err) => {
            console.log(err, 'GET - Fail to Load Database');
          });
        // const isEmailAlreadyUsed = this.state.usersDatabase.find((value) => {
        //   return value.email === email;
        // });
        // this.setState({
        //   // isEmailAlreadyUsed: this.state.usersDatabase.find((value) => {
        //   //   return value.email === email;
        //   // }),
        //   isEmailAlreadyUsed: false,
        // });
        //
        // } else {
        // }
        this.props.registerAction({ email, password });
        Axios.post(`${API_URL}/users`, {
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
    }
    // Axios.get(`${API_URL}/users?email=${email}&password=${password}`)
    //   .then((res) => {
    //     console.log(res, 'success to load database');
    //     console.log(res.data[0]);
    //     if (res.data.length === 0) {
    //       alert('invalid');
    //     } else {
    //       this.props.registerAction(res.data[0]);
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error, 'fail to load database');
    //     alert('fail to load database');
    //   });
  };

  render() {
    const { email, password, confirmPassword } = this.state.registerInfo;
    if (this.state.finsih) {
      return <Redirect to="/login"></Redirect>;
    }
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          height: '100vh',
        }}
      >
        <div>Regis Form</div>
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
        <Button onClick={this.register} className="my-2">
          register
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

export default connect(mapStateToProps, { registerAction })(RegisterPage);
