import { Route, Redirect } from 'react-router-dom'
import React, { Component } from "react"
import NavBar from "./navbar/Navbar"
import dbCalls from "../modules/dbCalls"
import EventsList from "./events/EventsList"
import EventsForm from "./events/EventsForm";

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


    delete = (resource, id) => {
        dbCalls.delete(resource, id)
        .then(() => dbCalls.getAll(resource))
        .then(returnObject => this.setState({ [resource]: returnObject }))
    }

    post = (resource, newObject) => {
        return dbCalls.post(resource, newObject)
            .then(() => dbCalls.getAll(resource))
            .then(returnObject => this.setState({ [resource]: returnObject }))
    }
    put = (resource, newObject, id) => {
        return dbCalls.put(resource, newObject, id)
            .then(() => dbCalls.getAll(resource))
            .then(returnObject => this.setState({ [resource]: returnObject }))
    }
    patch = (resource, newObject, id) => {
        return dbCalls.patch(resource, newObject, id)
            .then(() => dbCalls.getAll(resource))
            .then(returnObject => this.setState({ [resource]: returnObject }))
    }

    render() {
        return (
            <React.Fragment>
                {
                    this.props.isSessionAuthenticated() === true &&
                    <div className="wrapper">
                        <NavBar />
                        <Route exact path="/events" render={props => {
                            return < EventsList {...props} events={this.state.events}
                                                delete={this.delete}
                            />
                        }}
                        />
                        <Route path="/events/new" render={props => {
                            return < EventsForm post={this.post} {...props}
                            />
                        }}/>
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