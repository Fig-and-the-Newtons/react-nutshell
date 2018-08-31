import React, { Component } from "react";
import dbCalls from "../../modules/dbCalls"

export default class Login extends Component {
    state = {
        password: "",
        userName: ""
    }

    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    handleLogin = (e) => {
        e.preventDefault();

        dbCalls.getAll("users")
        .then(users => {
           const userNameExists = users.find(u => u.userName === this.state.userName) || {};
            if (userNameExists) {
                sessionStorage.setItem(
                    "credentials",
                    JSON.stringify({userNameExists})
                )
                this.props.history.push("/")
            } else {  
                dbCalls.post("users", {userName: this.state.userName, password: this.state.password})
                .then(() => dbCalls.getAll("users"))
                .then(users => {
                    const userNameExists = users.find(u => u.userName === this.state.userName) || {};
                    sessionStorage.setItem(
                        "credentials",
                        JSON.stringify({userNameExists})
                    )
                    this.props.history.push("/")
        
                })
        }


    })
}
}
