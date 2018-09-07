import React, { Component } from "react";
import "./MainList.css"
import Logo from "./images/FigNewtons.png"

export default class MainList extends Component {
    render(){
        return (
            <div>
                <div className="header">
                    <img src={Logo} alt="fig-and-the-newtons" className="logo" />
                </div>
                <h1 className="header">Hello Fig! and his newtons!</h1>
            </div>
        )
    }
}