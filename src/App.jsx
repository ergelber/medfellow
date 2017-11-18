import React, { PureComponent as Component } from 'react';
import { connect, Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import wrapper from './helpers/wrapper';

import { Home } from './components/Home';
import PrivateRoute from './components/PrivateRoute';
import { Dashboard, Quiz, Solutions } from './quiz';

import './App.css';

class App extends Component {

  render() {
    const { isLoggedIn, store } = this.props;

    return (
      <Provider store={store}>
        <Router>
          <div>
            <Route exact path="/login" component={wrapper(Home)} />
            <PrivateRoute isLoggedIn={isLoggedIn} exact path="/" component={wrapper(Dashboard)} />
            <PrivateRoute isLoggedIn={isLoggedIn} path="/quiz/:section/:quizId?" component={wrapper(Quiz)} />
            <PrivateRoute isLoggedIn={isLoggedIn} path="/solutions/:section/:quizId?" component={wrapper(Solutions)} />
          </div>
        </Router>
      </Provider>
    );
  }
}

const mapStateToProps = (state) => ({
  //isLoggedIn: getIsLoggedIn(state)
  isLoggedIn: true
});

export default connect(mapStateToProps)(App);
