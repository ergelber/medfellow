import React, { PureComponent as Component } from 'react';
import { Tab, Row, Nav, NavItem, Col } from 'react-bootstrap';
import Markdown from 'react-remarkable';

import './LoginModalHeader.css';

class LoginModalHeader extends Component {
  render() {
    const { signingUp, loggingIn, isLoggingIn } = this.props;
    console.log(this.props)
    return (
      <Tab.Container id="tabs-with-dropdown" defaultActiveKey={isLoggingIn ? 'second' : 'first'}>
        <Row className="clearfix">
          <Col sm={12}>
            <Nav bsStyle="tabs">
              <NavItem eventKey="first" onClick={signingUp}>
                Sign Up
              </NavItem>
              <NavItem eventKey="second" onClick={loggingIn}>
                Sign In
              </NavItem>
            </Nav>
          </Col>
        </Row>
      </Tab.Container>
    );
  }
}

export default LoginModalHeader;