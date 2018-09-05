import React, { Component } from "react";
import { Route, Redirect } from 'react-router-dom'
import NavBar from "./navbar/Navbar"
import MainPage from "./MainPage";

export default class ApplicationViews extends Component {
    render(){
        return (
            <React.Fragment>
                {
                    this.props.isAuthenticated() &&
                    <div>
                        <NavBar handleLogout={this.props.handleLogout}/>
                        <MainPage />
                    </div>
                }
                {
                    !this.props.isAuthenticated() &&
                    <Redirect to="/login" />
                }
            </React.Fragment>
        )
    }
}