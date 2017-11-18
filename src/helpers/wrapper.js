import React, { Component } from 'react';

import Header from '../components/Header';
// import Footer from '../components/Footer';

export default function (ComposedComponent) {
  class Wrapper extends Component {
    render() {
      return (
        <div>
          <Header />
          <ComposedComponent {...this.props} />
        </div>
      );
    }
  }

  return Wrapper;
}
