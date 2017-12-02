import React, { PureComponent as Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Header from '../components/Header';
import { getIsLoggedIn } from '../reducer';
import { logout } from '../Login';
// import Footer from '../components/Footer';

export default function (ComposedComponent) {
  class Wrapper extends Component {
    render() {
      return (
        <div>
          <Header {...this.props} />
          <ComposedComponent {...this.props} />
        </div>
      );
    }
  }

  const mapStateToProps = (state) => ({
    isLoggedIn: getIsLoggedIn(state)
  });

  return withRouter(connect(mapStateToProps, { logout })(Wrapper));
}
