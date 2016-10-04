'use strict';
import React, { Component } from 'react';
import Dashboard from './Dashboard'
import GlobalNav from './GlobalNav'


class App extends Component {
  render() {
    return (
      <div>
      <GlobalNav />
      {this.props.children || <Dashboard courses={COURSES}/>}
      </div>
    )
  }
}


module.exports = App;