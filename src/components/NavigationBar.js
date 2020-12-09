import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Button,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutAction } from '../redux/action';

class NavigationBar extends Component {
  state = {
    isOpen: false,
  };

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  handleLogout = () => {
    return localStorage.removeItem(this.props.id);
  };
  renderDropdown = () => {
    if (this.props.email !== null) {
      return (
        <DropdownMenu right>
          <DropdownItem>Hi, {this.props.username}</DropdownItem>
        </DropdownMenu>
      );
    } else {
      return (
        <DropdownMenu right>
          <Link to="/login">
            <DropdownItem>Login</DropdownItem>
          </Link>
          <Link to="/register">
            <DropdownItem>Register</DropdownItem>
          </Link>
        </DropdownMenu>
      );
    }
  };
  renderLogInfo = () => {
    if (this.props.email !== null) {
      return (
        <div>
          <NavbarText style={{ color: 'black', textDecoration: 'none', marginRight: '20px' }}>
            <div>Profile</div>
          </NavbarText>
          <Button color="danger" onClick={this.props.logoutAction} className="my-2">
            Logout
          </Button>
        </div>
      );
    } else {
      return console.log('NOT LOGGED IN');
    }
  };

  render() {
    return (
      <div>
        <Navbar color="" light expand="md" style={{ backgroundColor: 'rgba(255, 202, 0,1)' }}>
          <NavbarBrand href="/">Yuchase</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <Link to="/products">
                <NavItem>
                  <NavLink href="/components/">Products</NavLink>
                </NavItem>
              </Link>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  User
                </DropdownToggle>
                {this.renderDropdown()}
              </UncontrolledDropdown>
            </Nav>
            {this.renderLogInfo()}
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => {
  return {
    email: user.email,
    username: user.username,
    id: user.id,
  };
};

export default connect(mapStateToProps, { logoutAction })(NavigationBar);
