import { Route } from 'react-router-dom'
import React, { Component } from "react"
import TaskList from './tasks/TaskList'
import TaskForm from './tasks/TaskForm'
import dbCalls from "../modules/dbCalls"
import NewsList from "./news/NewsList"
import AddNewsForm from "./news/AddNewsForm"
import EventsList from "./events/EventsList"
import EventsForm from "./events/EventsForm";
import EventsEdit from "./events/EventsEdit"
import MessagesList from "./messages/MessagesList"
import MessagesEdit from "./messages/MessagesEdit"
import EditNews from "./news/EditNews"

export default class MainPage extends Component {
    state = {
        user: {},
        news: [],
        tasks: [],
        messages: [],
        events: [],
        friends: [],
        users: [],
        login: true
    }

    componentDidMount() {
        let newState = {};
        newState.user = JSON.parse(sessionStorage.getItem("user")) || {};
        dbCalls.getDataByUserId(newState.user.id, "events")
        .then(events => {newState.events = events})
        .then(() => dbCalls.getDataByUserId(newState.user.id, "tasks"))
        .then(tasks => {newState.tasks = tasks})
        .then(() => dbCalls.getDataByUserId(newState.user.id, "news"))
        .then(news => {newState.news = news})
        .then(() => dbCalls.getAll("messages"))
        .then(messages => {newState.messages = messages})
        .then(() => dbCalls.getAll("users"))
        .then(users => {newState.users = users})
        .then(() => dbCalls.getDataByUserId(newState.user.id, "friends"))
        .then(friends => {newState.friends = friends})
        .then(() => {
            this.setState(newState)
        })
    }

    postMessage = (resource, newObject) => {return dbCalls.post(resource, newObject)
        .then(() => dbCalls.getAll(resource))
        .then(returnObject => this.setState({[resource]: returnObject}))
    }
    deleteMessage = (resource, id) => {dbCalls.delete(resource, id)
            .then(() => dbCalls.getAll(resource))
            .then(returnObject => this.setState({[resource]: returnObject}))
    }
    patchMessage = (resource, newObject, id) => {return dbCalls.patch(resource, newObject, id)
        .then(() => dbCalls.getAll(resource))
        .then(returnObject => this.setState({[resource]: returnObject}))
    }
    postMessage = (resource, newObject) => {return dbCalls.post(resource, newObject)
        .then(() => dbCalls.getAll(resource))
        .then(returnObject => this.setState({[resource]: returnObject}))
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
    get = (resource, id) => {return dbCalls.get(resource, id)
    }



    render() {
        return (
            <React.Fragment>
                    <div className="wrapper">
                        <h1>Hello Fig! and his newtons!</h1>
                        <Route exact path="/news" render={(props) => {
                                return <NewsList {...props} allNews={this.state.news} delete={this.delete}
                                />
                        }} />
                        <Route exact path="/news/add" render={(props) => {
                                return <AddNewsForm {...props} user={this.state.user} AddNewsForm={this.AddNewsForm} post={this.post} />
                        }} />
                        <Route exact path="/news/edit/:newsId(\d+)" render={(props) => {
                            return <EditNews {...props} allNews={this.state.news}
                            patch={this.patch} />
                        }} />
                        <Route exact path="/events" render={props => {
                            return < EventsList {...props} events={this.state.events}
                                                delete={this.delete} 
                                                user={this.state.user} />
                        }} />
                        <Route path="/events/new" render={props => {
                            return < EventsForm post={this.post} {...props} 
                            user={this.state.user}/>
                        }} />
                        <Route path="/events/edit/:eventId(\d+)" render={props => {
                            return < EventsEdit patch={this.patch} {...props}
                                        events={this.state.events} />
                        }} />
                        <Route exact path="/messages" render={(props) => {
                            return <MessagesList {...props}
                            messages={this.state.messages}
                            users={this.state.users}
                            user={this.state.user}
                            delete={this.deleteMessage}
                            post={this.postMessage}
                            patch={this.patchMessage}
                            get={this.get} />
                        }} />
                        <Route exact path="/messages/edit/:messageId(\d+)" render={(props) => {
                            return <MessagesEdit {...props}
                            patch={this.patchMessage}
                            messages={this.state.messages} />
                        }} />
                        <Route exact path="/tasks" render={(props) => {
                            return <TaskList {...props} delete={this.delete} patch={this.patch} tasks={this.state.tasks} />
                        }} />
                        <Route exact path="/tasks/new" render={(props) => {
                            return <TaskForm {...props} post={this.post} tasks={this.state.tasks} />
                        }} />
                    </div>
            </React.Fragment>
        )
    }
}