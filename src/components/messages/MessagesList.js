import React, { Component } from "react"
import "./Messages.css"

export default class MessagesList extends Component {
    state = {
        userId: 1,
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

    render () {
        return (
            <React.Fragment>
                <div id="messagesContainer">
                <div id="messageTitle">
                    <h3>Messages</h3>
                </div>
                <div>
                    <section className="messages">
                    {
                        this.props.messages.map(messageObject =>
                            <div id={`message--${messageObject.id}`} key={messageObject.id} className="card">
                                <div className="card-body">
                                    <h5 className="card-title">
                                        {messageObject.userId}
                                    </h5>
                                    <p className="message-text">{messageObject.message}</p>
                                    <button onClick={() => this.props.delete("messages", messageObject.id)} className="card-link btn btn-success">Delete</button>
                                    <button type="button"className="btn btn-success" onClick={() => {
                                        this.props.history.push(`/messages/edit/${messageObject.id}`)}
                                    }>Edit</button>
                                </div>
                            </div>
                        )
                    }
                    </section>
                </div>
                <textarea ref="message" id="message" onChange={this.handleFieldChange}></textarea>
                <button id="submitButton" type="button" className="btn btn-success" onClick={() => {
                        this.props.post("messages", this.state)
                        .then(this.handleSubmit)
                    }}>Post Message</button>
                </div>
            </React.Fragment>
        )
    }
}