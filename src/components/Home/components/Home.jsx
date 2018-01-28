import React, { PureComponent as Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

import Books from '../../images/books_1.png';
import Banner from '../../images/medfellow-banner.png';

import { login, loggingIn, signingUp, signup, clearLoginNotification, setLoginNotification } from '../../../Login';
import { getIsLoggedIn, getIsSigningUp, getIsLoggingIn, getLoginNotification } from '../../../reducer';
import { LoginModal } from '../../../Login';

import './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = { showLogin: false };

    this.clickHandler = this.clickHandler.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentWillMount() {
    const { history, isLoggedIn } = this.props;
    if(isLoggedIn) history.push('/');
  }

  closeModal() {
    this.setState({ showLogin: false });
  }

  clickHandler() {
    this.setState({ showLogin: true });
  } 
  
  render() {
    const { signup, isLoggingIn, isSigningUp, 
      signingUp, loggingIn, loginNotification,
      clearLoginNotification, setLoginNotification,
      login, history
    } = this.props;

    return (
      <div className='home-container'>
        <div className="home-title-container">
          <img className="img-responsive home-banner" src={Banner} alt="" />
          <div className='home-slogan'>Over 1000 free MCAT questions and passages written by top 1% scorers</div>
          <Button className='login-button' onClick={this.clickHandler} >Get Started</Button>
        </div>
        <div className='books-container'>
          <img className="img-responsive" src={Books} alt="" />
        </div>
        <LoginModal 
          loggingIn={loggingIn}
          signingUp={signingUp}
          isLoggingIn={isLoggingIn}
          signup={signup}
          isSigningUp={isSigningUp}
          show={this.state.showLogin} 
          onHide={this.closeModal} 
          history={history}
          login={login}
          loginNotification={loginNotification}
          setLoginNotification={setLoginNotification}
          clearLoginNotification={clearLoginNotification} />
      </div> 
    );
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: getIsLoggedIn(state),
  isSigningUp: getIsSigningUp(state),
  isLoggingIn: getIsLoggingIn(state),
  loginNotification: getLoginNotification(state)
})

const HomeContainer = withRouter(connect(mapStateToProps, {
  login,
  loggingIn,
  signingUp,
  signup,
  clearLoginNotification,
  setLoginNotification
})(Home));

export default HomeContainer;