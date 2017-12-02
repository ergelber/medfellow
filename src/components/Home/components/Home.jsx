import React, { PureComponent as Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

import Books from '../../images/books_1.png';
import Banner from '../../images/medfellow-banner.png';

import { login, loggingIn, signingUp } from '../../../Login';
import { getIsLoggedIn, getIsSigningUp, getIsLoggingIn } from '../../../reducer';
import { LoginModal } from '../../../Login';

import './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = { showLogin: false };

    this.clickHandler = this.clickHandler.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.login = this.login.bind(this);
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

  login() {
    const { login, history } = this.props;
    login();
    history.push('/');
  }

  render() {
    console.log(this.props)
    const { isLoggingIn, isSigningUp, signingUp, loggingIn } = this.props;

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
          isSigningUp={isSigningUp}
          show={this.state.showLogin} 
          onHide={this.closeModal} 
          login={this.login} />
      </div> 
    );
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: getIsLoggedIn(state),
  isSigningUp: getIsSigningUp(state),
  isLoggingIn: getIsLoggingIn(state)
})

const HomeContainer = withRouter(connect(mapStateToProps, {
  login,
  loggingIn,
  signingUp
})(Home));

export default HomeContainer;