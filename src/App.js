import React, { Component } from 'react';
import { Route } from 'react-router-dom'

import Login from "./components/login/Login"
import './App.css';
import MainPage from './components/MainPage';


export default class App extends Component {
  isSessionAuthenticated = () => sessionStorage.getItem("credentials") !== null;

  render() {


    return (
      <React.Fragment>
        {
          this.isSessionAuthenticated() === false && 
          <Route exact path="/login" render={(props) => {
              return <Login {...props} />
          }} />
        }
        {
          <MainPage isSessionAuthenticated={this.isSessionAuthenticated} />
        }
      </React.Fragment>
    )
  }
}
