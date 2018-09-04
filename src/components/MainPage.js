import { Route, Redirect } from 'react-router-dom'
import React, { Component } from "react"
import NavBar from "./navbar/Navbar"
import dbCalls from "../modules/dbCalls"
import NewsList from "./news/NewsList"
import AddNewsForm from "./news/AddNewsForm"

export default class MainPage extends Component {
    state = {
        news: [],
        tasks: [],
        messages: [],
        events: [],
        friends: [],
        login: true
    }


    // get user id form session storage fuction it will return the user id to wherever you call this funciton
        getUserId = () => {
        let stringifiedUser = sessionStorage.getItem("credentials");
        let parsedUser = JSON.parse(stringifiedUser);
        return parsedUser.userNameExists.id
     }


    componentDidMount(){
        let newState = {};
        dbCalls.getDataByUserId(this.getUserId(), "events")
        .then(events => {newState.events = events})
        .then(() => dbCalls.getDataByUserId(this.getUserId(), "tasks"))
        .then(tasks => {newState.tasks = tasks})
        .then(() => dbCalls.getDataByUserId(this.getUserId(), "news"))
        .then(news => {newState.news = news})
        .then(() => dbCalls.getDataByUserId(this.getUserId(), "messages"))
        .then(messages => {newState.messages = messages})
        .then(() => dbCalls.getDataByUserId(this.getUserId(), "friends"))
        .then(friends => {newState.friends = friends})
        .then(() => {
            this.setState(newState)
        })
    }

    // componentDidMount() {
    //     const newState = {}

    //     dbCalls.getDataByUserId(this.getUserId(), "news")
    //     .then(allNews => {
    //         newState.news = allNews
    //     })

    //     dbCalls.getAll("tasks")
    //     .then(allTasks => {
    //         newState.tasks = allTasks
    //     })
    //     dbCalls.getAll("messages")
    //     .then(allMessages => {
    //         newState.messages = allMessages
                   
    //     })
    //     dbCalls.getAll("events")
    //     .then(allEvents => {
    //         newState.events = allEvents
           
    //     })
    //     dbCalls.getAll("friends")
    //     .then(allFriends => {
    //         newState.friends = allFriends
           
    //     })
    //     .then(() => this.setState(newState))
    // }

    
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

    ///////////////////////// Kayla's stuff start //////////////////////////////////////////////////////
    post = (resource, newObject) => {return dbCalls.post(resource, newObject)
        .then(() => dbCalls.getAll(resource))
        .then(returnObject => this.getEverything())
    }

    getEverything = () => {
        dbCalls.getDataByUserId(this.getUserId(), "news")
        .then(allNews => {
            this.setState.news = allNews
        })
    }


    // Logout function 
    handleLogout = () => {
        sessionStorage.removeItem("credentials");
        this.setState({login: false})
    }

    /////////////////////////// end of Kayla's stuff/////////////////////////////////////////////////////

    render() {
        return (
            <React.Fragment>
                {
                    this.props.isSessionAuthenticated() === true &&
                    <div className="wrapper">
                    <NavBar handleLogout={this.handleLogout}/>
                    <Route exact path="/news" render={(props) => {
                            return <NewsList {...props} allNews={this.state.news} delete={this.delete} />
                        }} />
                    <Route exact path="/news/add" render={(props) => {
                            return <AddNewsForm {...props} AddNewsForm={this.AddNewsForm} post={this.post}/>
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