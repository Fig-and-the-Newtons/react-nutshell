import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import Login from "./components/login/Login"
import './App.css';
import ApplicationViews from "./components/ApplicationViews";



export default class App extends Component {
    state = {
        login: true
    }
    
    handleLogout = () => {
        sessionStorage.removeItem("user");
        this.setState({login: false})
    }

    isAuthenticated = () => sessionStorage.getItem("user") !== null
    
    render() {
        return (
            <React.Fragment>
                {
                    !this.isAuthenticated() &&
                    <Route exact path="/login" render={(props) => {
                        return <Login {...props} />
                    }} />
                }
                {
                    <ApplicationViews isAuthenticated={this.isAuthenticated} handleLogout={this.handleLogout} />
                }
            </React.Fragment>
        )
    }
}
