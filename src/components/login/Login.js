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
            let userNameExists = users.find(u => u.userName === this.state.userName);
            if(userNameExists){
                sessionStorage.setItem("user", JSON.stringify(userNameExists))
                this.props.history.push("/news")
            } else {  
                dbCalls.post("users", {userName: this.state.userName, password: this.state.password})
                .then(() => dbCalls.getAll("users"))
                .then(users => {
                    userNameExists = users.find(u => u.userName === this.state.userName);
                    sessionStorage.setItem("user", JSON.stringify(userNameExists))
                    this.props.history.push("/news")
                })
            }
        })
    }

    render() {
        return (
            <form onSubmit={this.handleLogin}>
                <fieldset>
                    <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                    <label htmlFor="inputEmail">User Name: </label>
                    <input onChange={this.handleFieldChange} type="text"
                    id="userName"
                    placeholder="User Name"
                    required="" autoFocus="" /></fieldset>
                <fieldset>
                    <label htmlFor="inputPassword">Password: </label>
                    <input onChange={this.handleFieldChange} type="password"
                    id="password"
                    placeholder="Password"
                    required="" /></fieldset>
                {/* <fieldset>
                    <label>Remember Me</label>
                    <input type="checkbox" onChange={this.checkbox}></input>
                </fieldset> */}
                <fieldset>
                    <button type="submit">Sign in</button></fieldset>
            </form>
        )
    }
}
