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
        friends: []
    }


    // get user id form session storage fuction it will return the user id to wherever you call this funciton
    loadUserIDFromSS = () => {
        let stringifiedUser = sessionStorage.getItem("credentials");
        let parsedUser = JSON.parse(stringifiedUser);
        return parsedUser.userNameExists.id
     }


    componentDidMount() {
        const newState = {}

        dbCalls.getDataByUserId(this.loadUserIDFromSS(), "news")
        .then(allNews => {
            newState.news = allNews
        })
        // dbCalls.getAll("news")
        // .then(allNews => {
        //     newState.news = allNews
        // })
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
    // getNews = (userId) => {
    //     return dbCalls.getNews(userId)
    //     .then(() => dbCalls.getNews(resource))
    //     .then(returnObject => this.setState({[resource]: returnObject}))

    // }

    render() {
        return (
            <React.Fragment>
                {
                    this.props.isSessionAuthenticated() === true &&
                    <div className="wrapper">
                    <NavBar />
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