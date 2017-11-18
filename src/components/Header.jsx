import React, { PureComponent as Component } from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Logo from './images/Medfellow_Logo.png';

import './Header.css';

class Header extends Component {
  render() {
    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to='/'><img className='header-logo' src={ Logo } alt="Logo"/></Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        {/* <Navbar.Collapse>
          <Nav pullRight>
            <NavItem eventKey={2} href="#">Logout</NavItem>
          </Nav>
        </Navbar.Collapse> */}
      </Navbar>
    );
  }
}

export default Header;
