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
import { getIsLoggedIn, getUserRole } from './reducer';
import { EditorMain, SectionOverview, EditForm } from './editor';

import './App.css';

class App extends Component {

  render() {
    const { isLoggedIn, store, userRole } = this.props;
    const isAdmin = userRole === 'admin';
    
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Route exact path="/login" component={wrapper(Home)} />
            <PrivateRoute 
              exact path="/"
              isLoggedIn={isLoggedIn} 
              component={wrapper(Dashboard)} 
            />
            <PrivateRoute 
              path="/quiz/:section/:quizId?"
              isLoggedIn={isLoggedIn} 
              component={wrapper(Quiz)} 
            />
            <PrivateRoute 
              path="/solutions/:section/:quizId?"
              isLoggedIn={isLoggedIn}
              component={wrapper(Solutions)} 
            />
            <PrivateRoute
              exact path="/editor"
              verifiedAdmin={isAdmin}
              isLoggedIn={isLoggedIn}
              component={wrapper(EditorMain)}
            />
            <PrivateRoute
              path="/editor/view/:questionType/:section"
              isLoggedIn={isLoggedIn}
              verifiedAdmin={isAdmin}
              component={wrapper(SectionOverview)}
            />
            <PrivateRoute
              path="/editor/edit/:questionType/:id/:saved?"
              isLoggedIn={isLoggedIn}
              verifiedAdmin={isAdmin}
              component={wrapper(EditForm)}
            />
            <PrivateRoute
              path="/editor/new/:questionType/:passageId?"
              isLoggedIn={isLoggedIn}
              verifiedAdmin={isAdmin}
              component={wrapper(EditForm)}
            />
          </div>
        </Router>
      </Provider>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: getIsLoggedIn(state),
  userRole: getUserRole(state)
});

export default connect(mapStateToProps)(App);
