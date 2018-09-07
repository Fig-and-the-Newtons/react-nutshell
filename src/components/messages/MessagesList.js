import React, { Component } from "react"
import "./Messages.css"

export default class MessagesList extends Component {
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
    scrollToBottom() {
        const scrollHeight = this.messageList.scrollHeight;
        const height = this.messageList.clientHeight;
        const maxScrollTop = scrollHeight - height;
        this.messageList.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }
    componentDidUpdate() {
        this.scrollToBottom();
    }
    componentDidMount() {
        this.scrollToBottom();
    }

    render () {
        let newMessage = {
            userId: this.props.user.id,
            message: this.state.message,
            date: Date.now()
        }
        return (
            <React.Fragment>
                <div id="messagesContainer" className="mx-auto">
                <div id="messageTitle">
                    <h3 className="header">Messages</h3>
                </div>
                <div>
                    <section id="messageList" className="messageList" ref={(div) => {
                        this.messageList = div;
                    }}>
                    {
                        this.props.messages.map(messageObject => {
                            let currentUser = this.props.users.find(u => u.id === messageObject.userId);
                            return <div id={`message--${messageObject.id}`} key={messageObject.id} className="card">
                            <div className="row">


                                <div className="col-10 messageLeft">
                                    <div className="h3">
                                        {currentUser.userName}
                                    </div>
                                    <div>{messageObject.message}</div>
                                </div>

                                <div className="col-2 buttonDiv">
                                    <div className="row">
                                    <button type="button"className="btn messageEditButton col-12" onClick={() => {
                                        this.props.history.push(`/messages/edit/${messageObject.id}`)}
                                    }>Edit</button>
                                    <button onClick={() => this.props.delete("messages", messageObject.id)} className="card-link btn messageDeleteButton col-12">Delete</button>
                                    </div>
                                </div>


                            </div>
                                    </div>
                        })
                        
                    }
                    </section>
                </div>
                <textarea className="textarea" ref="message" id="message" onChange={this.handleFieldChange}></textarea>
                <button id="submitButton" type="button" className="btn" onClick={() => {
                        this.props.post("messages", newMessage)
                        .then(this.handleSubmit)
                    }}>Post Message</button>
                </div>
            </React.Fragment>
        )
    }
}