import React, { PureComponent as Component } from 'react';
import { Navbar, NavItem, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Logo from './images/Medfellow_Logo.png';

import './Header.css';

class Header extends Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
  }

  logout() {
    const { logout, history } = this.props;
    logout();
    history.push('/login');
  }

  render() {
    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to='/'><img className='header-logo' src={ Logo } alt="Logo"/></Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        { this.props.isLoggedIn ? 
          <Navbar.Collapse>
            <Nav pullRight>
              <NavItem eventKey={2} onClick={this.logout}>Logout</NavItem>
            </Nav>
          </Navbar.Collapse> : null } 
      </Navbar>
    );
  }
}

export default Header;
