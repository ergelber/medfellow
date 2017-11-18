import React, { PureComponent as Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

import Books from '../../images/books_1.png'
import Banner from '../../images/medfellow-banner.png'

// import Login from './Login';

import './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    return this.props.history.push('/');
  } 

  render() {
    console.log(this.props)
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
      </div> 
    );
  }
}

const HomeContainer = withRouter(connect(null, null)(Home));

export default HomeContainer;