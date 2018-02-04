import React, { PureComponent as Component } from 'react';
import { Alert, Modal, Button, Form, FormGroup, FormControl, ControlLabel, Col } from 'react-bootstrap';

import LoginModalHeader from './LoginModalHeader';

import './LoginModal.css';

class LoginModal extends Component {
  constructor(props) {
    super(props);

    this.state = { username: '', password: ''}

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate(prevProps) {
    if(prevProps.loginNotification === this.props.loginNotification)
      this.props.clearLoginNotification();
  }

  handleChange(e, type) {
    this.setState({ [type]: e.target.value });
  }

  handleSubmit() {
    const { isLoggingIn, login, history, signup, setLoginNotification } = this.props;
    if(!this.state.username || !this.state.password) {
      return setLoginNotification('You must enter a username and password');
    }
    if(isLoggingIn) {
      return login(this.state.username, this.state.password)
        .then(({ err }) => {
          if(err) return setLoginNotification('Incorrect username and password');
          return history.push('/');
        });
    } else {
      signup(this.state.username, this.state.password)
        .then(({ err }) => {
          if (err) return setLoginNotification('Username already taken');
          return history.push('/');
        });
    }
  }

  render() {
    const { loggingIn, signingUp, isLoggingIn, loginNotification } = this.props;

    return (
      <Modal className='modal-container' {...this.props} aria-labelledby="contained-modal-title-md">
        <Modal.Header closeButton>
          <LoginModalHeader
            loggingIn={loggingIn}
            signingUp={signingUp}
            isLoggingIn={isLoggingIn} />
        </Modal.Header>
        <Modal.Body>
          { loginNotification
            ? <Alert bsStyle="danger">{loginNotification}</Alert>
            : null }
          <Form horizontal>
            <FormGroup controlId="formHorizontalEmail">
              <Col componentClass={ControlLabel} sm={2}>
                Email
              </Col>
              <Col sm={10}>
                <FormControl 
                  type="email" 
                  placeholder="Email"
                  onChange={(e) => this.handleChange(e, 'username')}
                />
              </Col>
            </FormGroup>
            <FormGroup controlId="formHorizontalPassword">
              <Col componentClass={ControlLabel} sm={2}>
                Password
              </Col>
              <Col sm={10}>
                <FormControl 
                  type="password" 
                  placeholder="Password" 
                  onChange={(e) => this.handleChange(e, 'password')}
                />
              </Col>
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.handleSubmit}>{ isLoggingIn ? 'Login' : 'Sign Up'}</Button>
        </Modal.Footer>
      </Modal>
    );
  }
};

export default LoginModal;