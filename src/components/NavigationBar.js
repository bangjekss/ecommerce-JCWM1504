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
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// const Example = (props) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggle = () => setIsOpen(!isOpen);

// };

class NavigationBar extends Component {
  state = {
    isOpen: false,
  };

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    if (this.props.email == null) {
      return <div style={{ display: 'hidden' }}></div>;
    }
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Yuchase</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink href="/components/">Products</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  User
                </DropdownToggle>
                <DropdownMenu right>
                  <Link to="/login">
                    <DropdownItem>Login</DropdownItem>
                  </Link>
                  <DropdownItem>Register</DropdownItem>
                  {/* <DropdownItem divider />
                  <DropdownItem>Reset</DropdownItem> */}
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
            <NavbarText>Simple Text</NavbarText>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = (gstate) => {
  return {
    email: gstate.user.email,
  };
};

export default connect(mapStateToProps)(NavigationBar);
