// import { Route, Redirect } from 'react-router-dom'
import React, { Component } from "react"
import NavBar from "./navbar/Navbar"
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
                <NavBar />
                <h1>
                    Hello Fig! and his newtons!
                </h1>

            </React.Fragment>

        )
    }

}