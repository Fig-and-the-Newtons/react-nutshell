import React, { Component } from "react"
import "./Messages.css"

export default class MessagesList extends Component {
    componentDidMount() {
        console.log(this.props.user.id)
        const user = this.props.user.id
        let newState = {};
        newState.userId = user
        newState.message = "";
        newState.date = Date.now()
        this.setState(newState)
    }
    state = {
        userId: {},
        message: "",
        date: Date.now()
    }
    
    handleFieldChange = evt => {
        evt.preventDefault();
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    handleSubmit = (e) => {
        var message = this.refs.message;
        message.value = "";
    }

    get = (resource, id) => {
        this.props.get(resource, id)
        .then((userObject) => {
            let name = userObject.userName
            return name
        })
    }

    render () {
        let newMessage = {
            userId: this.props.user.id,
            message: this.state.message,
            date: Date.now()
        }
        return (
            <React.Fragment>
                <div id="messagesContainer">
                <div id="messageTitle">
                    <h3>Messages</h3>
                </div>
                <div>
                    <section className="messages">
                    {
                        this.props.messages.map(messageObject => {
                            console.log(this.props.user.id)
                            let currentUser = this.props.users.find(u => u.id === messageObject.userId);
                            return <div id={`message--${messageObject.id}`} key={messageObject.id} className="card">
                                <div className="card-body">
                                    <h5 className="card-title">
                                        {currentUser.userName}
                                    </h5>
                                    <p className="message-text">{messageObject.message}</p>
                                    <button onClick={() => this.props.delete("messages", messageObject.id)} className="card-link btn btn-success">Delete</button>
                                    <button type="button"className="btn btn-success" onClick={() => {
                                        this.props.history.push(`/messages/edit/${messageObject.id}`)}
                                    }>Edit</button>
                                </div>
                            </div>
                        })
                    }
                    </section>
                </div>
                <textarea ref="message" id="message" onChange={this.handleFieldChange}></textarea>
                <button id="submitButton" type="button" className="btn btn-success" onClick={() => {
                        this.props.post("messages", newMessage)
                        .then(this.handleSubmit)
                    }}>Post Message</button>
                </div>
            </React.Fragment>
        )
    }
}