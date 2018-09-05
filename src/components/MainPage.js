import { Route, Redirect } from 'react-router-dom'
import React, { Component } from "react"
import NavBar from "./navbar/Navbar"
import TaskList from './tasks/TaskList'
import TaskForm from './tasks/TaskForm'
import dbCalls from "../modules/dbCalls"
import NewsList from "./news/NewsList"
import AddNewsForm from "./news/AddNewsForm"
import MainList from "./main/MainList"
import EventsList from "./events/EventsList"
import EventsForm from "./events/EventsForm";
import EventsEdit from "./events/EventsEdit"
import MessagesList from "./messages/MessagesList"
import MessagesEdit from "./messages/MessagesEdit"

export default class MainPage extends Component {
    state = {
        user: {},
        news: [],
        tasks: [],
        messages: [],
        events: [],
        friends: [],
        login: true
    }

    componentDidMount() {
        let newState = {};
        newState.user = JSON.parse(sessionStorage.getItem("user")) || {};
        console.log("newstate", newState);
        dbCalls.getDataByUserId(newState.user.id, "events")
        .then(events => {newState.events = events})
        .then(() => dbCalls.getDataByUserId(newState.user.id, "tasks"))
        .then(tasks => {newState.tasks = tasks})
        .then(() => dbCalls.getDataByUserId(newState.user.id, "news"))
        .then(news => {newState.news = news})
        .then(() => dbCalls.getAll("messages"))
        .then(messages => {newState.messages = messages})
        .then(() => dbCalls.getDataByUserId(newState.user.id, "friends"))
        .then(friends => {newState.friends = friends})
        .then(() => {
            this.setState(newState)
        })
    }

    delete = (resource, id) => {dbCalls.delete(resource, id)
            .then(() => dbCalls.getDataByUserId(this.state.user.id, resource))
            .then(returnObject => this.setState({[resource]: returnObject}))
        }

    post = (resource, newObject) => {return dbCalls.post(resource, newObject)
            .then(() => dbCalls.getDataByUserId(this.state.user.id, resource))
            .then(returnObject => this.setState({[resource]: returnObject}))
        }
    put = (resource, newObject, id) => {return dbCalls.put(resource, newObject, id)
            .then(() => dbCalls.getDataByUserId(this.state.user.id, resource))
            .then(returnObject => this.setState({[resource]: returnObject}))
        }
    patch = (resource, newObject, id) => {return dbCalls.patch(resource, newObject, id)
            .then(() => dbCalls.getDataByUserId(this.state.user.id, resource))
            .then(returnObject => this.setState({[resource]: returnObject}))
        }


    render() {
        console.log("mainPage")
        return (
            <React.Fragment>
                {
                    this.props.isAuthenticated() &&
                    <div className="wrapper">
                        <NavBar handleLogout={this.props.handleLogout}/>
                        <h1>Hello Fig! and his newtons!</h1>
                        <Route exact path="/" render={(props) => {
                            return <MainList {...props} />
                        }} />
                        <Route exact path="/news" render={(props) => {
                                return <NewsList {...props} allNews={this.state.news} delete={this.delete} />
                        }} />
                        <Route exact path="/news/add" render={(props) => {
                                return <AddNewsForm {...props} AddNewsForm={this.AddNewsForm} post={this.post} />
                        }} />
                        <Route exact path="/events" render={props => {
                            return < EventsList {...props} events={this.state.events}
                                                delete={this.delete} />
                        }} />
                        <Route path="/events/new" render={props => {
                            return < EventsForm post={this.post} {...props} />
                        }} />
                        <Route path="/events/edit/:eventId(\d+)" render={props => {
                            return < EventsEdit patch={this.patch} {...props}
                                        events={this.state.events} />
                        }} />
                        <Route exact path="/messages" render={(props) => {
                            return <MessagesList {...props}
                            messages={this.state.messages}
                            delete={this.delete}
                            post={this.post}
                            patch={this.patch}
                            get={this.get} />
                        }} />
                        <Route exact path="/messages/edit/:messageId(\d+)" render={(props) => {
                            return <MessagesEdit {...props}
                            patch={this.patch}
                            messages={this.state.messages} />
                        }} />
                        <Route exact path="/tasks" render={(props) => {
                            return <TaskList {...props} delete={this.delete} patch={this.patch} tasks={this.state.tasks} />
                        }} />
                        <Route exact path="/tasks/new" render={(props) => {
                            return <TaskForm {...props} post={this.post} tasks={this.state.tasks} />
                        }} />
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