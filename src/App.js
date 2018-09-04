import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom'

import Login from "./components/login/Login"
import './App.css';
import MainPage from './components/MainPage';

export default class App extends Component {
  isSessionAuthenticated = () => sessionStorage.getItem("credentials") !== null;

  render() {


    return (
      <React.Fragment>
        <Route exact path="/login" component={Login} />
        <Route exact path="/" render={(props) => {
          if (this.isSessionAuthenticated()) {
            return <MainPage />
          } else {
            return <Redirect to="/login" />
          }
        }} />
        
      </React.Fragment>
    )
  }
}
