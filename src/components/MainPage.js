import React, { Component } from "react"
import { Route, Redirect } from 'react-router-dom'
import NavBar from "./navbar/Navbar"
import TaskList from './tasks/TaskList'
import TaskForm from './tasks/TaskForm'
import dbCalls from "../modules/dbCalls"

export default class MainPage extends Component {
    state = {
        news: [],
        tasks: [],
        messages: [],
        events: [],
        friends: []
    }

    componentDidMount() {
        const newState = {}

        dbCalls.getAll("news")
        .then(allNews => {
            newState.news = allNews
        })
        dbCalls.getAll("tasks")
        .then(allTasks => {
            newState.tasks = allTasks
        })
        dbCalls.getAll("messages")
        .then(allMessages => {
            newState.messages = allMessages
                   
        })
        dbCalls.getAll("events")
        .then(allEvents => {
            newState.events = allEvents
           
        })
        dbCalls.getAll("friends")
        .then(allFriends => {
            newState.friends = allFriends
           
        })
        .then(() => this.setState(newState))
    }

    
    delete = (resource, id) => {dbCalls.delete(resource, id)
                .then(() => dbCalls.getAll(resource))
                .then(returnObject => this.setState({[resource]: returnObject}))
            }

    post = (resource, newObject) => {return dbCalls.post(resource, newObject)
                .then(() => dbCalls.getAll(resource))
                .then(returnObject => this.setState({[resource]: returnObject}))
            }
    put = (resource, newObject, id) => {return dbCalls.put(resource, newObject, id)
                .then(() => dbCalls.getAll(resource))
                .then(returnObject => this.setState({[resource]: returnObject}))
            }
    patch = (resource, newObject, id) => {return dbCalls.patch(resource, newObject, id)
                .then(() => dbCalls.getAll(resource))
                .then(returnObject => this.setState({[resource]: returnObject}))
    }

    render() {
        return (
            <React.Fragment>

                {
                    this.props.isSessionAuthenticated() === true &&
                    <div className="wrapper">
                        <NavBar />
                        <Route exact path="/tasks" render={(props) => {
                            return <TaskList {...props} delete={this.delete} patch={this.patch} tasks={this.state.tasks}/>
                        }} />
                        <Route exact path="/tasks/new" render={(props) => {
                            return <TaskForm {...props} post={this.post} tasks={this.state.tasks} />
                        }} />
                    </div>

                }
                {
                    this.props.isSessionAuthenticated() === false &&
                    <Redirect to="/login" />
                }
            </React.Fragment>

        )
    }

}