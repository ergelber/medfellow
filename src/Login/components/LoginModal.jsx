import React, { PureComponent as Component } from 'react';
import { Modal, Button, Form, FormGroup, FormControl, ControlLabel, Col } from 'react-bootstrap';
import Markdown from 'react-remarkable';

import LoginModalHeader from './LoginModalHeader';

import './LoginModal.css';

class LoginModal extends Component {
  render() {
    const { loggingIn, signingUp, login, isLoggingIn } = this.props;
    console.log(this.props)
    return (
      <Modal className='modal-container' {...this.props} aria-labelledby="contained-modal-title-md">
        <Modal.Header closeButton>
          <LoginModalHeader
            loggingIn={loggingIn}
            signingUp={signingUp}
            isLoggingIn={isLoggingIn} />
        </Modal.Header>
        <Modal.Body>
          <Form horizontal>
            <FormGroup controlId="formHorizontalEmail">
              <Col componentClass={ControlLabel} sm={2}>
                Email
              </Col>
              <Col sm={10}>
                <FormControl type="email" placeholder="Email" />
              </Col>
            </FormGroup>
            <FormGroup controlId="formHorizontalPassword">
              <Col componentClass={ControlLabel} sm={2}>
                Password
              </Col>
              <Col sm={10}>
                <FormControl type="password" placeholder="Password" />
              </Col>
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={login}>{ isLoggingIn ? 'Login' : 'Sign Up'}</Button>
        </Modal.Footer>
      </Modal>
    );
  }
};

export default LoginModal;